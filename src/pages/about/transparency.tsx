import type { GetStaticProps } from "next";
import { fetchData } from "lib/server";
import gql from "graphql-tag";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import { Text } from "components/text";
import { SEO } from "components/seo";
import type { TransparencyIndexPageQuery } from "generated/graphql";
import { Table } from "components/table";
import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "components/table/Table";
import { groupBy, uniq } from "lodash-es";
import { Listbox } from "components/listbox";
import { useState } from "react";
import type { Comparator } from "utils/types";
import { Row } from "components/box";
import { HorizontalScroll } from "components/utils/HorizontalScroll";

interface TransparencyIndexPageProps extends SharedPageProps, TransparencyIndexPageQuery {}

interface HasDate {
    date: string;
}

const sortByDateDesc: Comparator<HasDate> =
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime();

const getDateFormatted = <T extends HasDate>(item: T) => {
    const date = new Date(item.date);

    return date.toLocaleDateString("en", {
        month: "long",
        year: "numeric",
    });
};

const groupByMonth = <T extends HasDate>(collection: T[]) => groupBy(collection, (item) => getDateFormatted(item));

const currencyFormat = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
});

export default function TransparencyIndexPage({ balanceAll, transactionAll }: TransparencyIndexPageProps) {
    balanceAll.sort(sortByDateDesc);
    transactionAll.sort(sortByDateDesc);

    const months = uniq([...balanceAll, ...transactionAll].sort(sortByDateDesc).map(getDateFormatted));

    const balancesByMonth = groupByMonth(balanceAll);
    const transactionsByMonth = groupByMonth(transactionAll);

    const [currentMonth, setCurrentMonth] = useState(months[0]);

    const balances = balancesByMonth[currentMonth] ?? [];
    const transactions = transactionsByMonth[currentMonth] ?? [];

    return (
        <>
            <SEO title="Transparency"/>
            <Row $wrap style={{ "--gap": "16px", "--justify-content": "space-between", "--align-items": "center" }}>
                <Text variant="h1">Transparency</Text>
                <Listbox value={currentMonth} onChange={setCurrentMonth}>
                    {months.map((month) => (
                        <Listbox.Option key={month} value={month}>{month}</Listbox.Option>
                    ))}
                </Listbox>
            </Row>
            <Text variant="h2">Balances</Text>
            {balances.length ? (
                <BalanceTable balances={balances}/>
            ) : (
                <Text>No results found.</Text>
            )}
            <Text variant="h2">Transactions</Text>
            {transactions.length ? (
                <TransactionTable transactions={transactions}/>
            ) : (
                <Text>No results found.</Text>
            )}
        </>
    );
}

interface BalanceTableProps {
    balances: TransparencyIndexPageProps["balanceAll"];
}

function BalanceTable({ balances }: BalanceTableProps) {
    return (
        <HorizontalScroll fixShadows>
            <Table style={{ "--columns": "1fr 1fr 1fr 1fr" }}>
                <TableHead>
                    <TableHeadCell>Service</TableHeadCell>
                    <TableHeadCell>Frequency</TableHeadCell>
                    <TableHeadCell>Month to Date Usage</TableHeadCell>
                    <TableHeadCell>Balance</TableHeadCell>
                </TableHead>
                <TableBody>
                    {balances.map((balance) => (
                        <TableRow key={balance.id}>
                            <TableCell>{balance.service}</TableCell>
                            <TableCell>{balance.frequency}</TableCell>
                            <TableCell>
                                <Text color={balance.usage > 0 ? "text-warning" : balance.usage < 0 ? "text-primary" : undefined}>
                                    {currencyFormat.format(balance.usage)}
                                </Text>
                            </TableCell>
                            <TableCell>
                                <Text color={balance.month_to_date_balance < 0 ? "text-warning" : balance.month_to_date_balance > 0 ? "text-primary" : undefined}>
                                    {currencyFormat.format(balance.month_to_date_balance)}
                                </Text>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </HorizontalScroll>
    );
}

interface TransactionTableProps {
    transactions: TransparencyIndexPageProps["transactionAll"];
}

function TransactionTable({ transactions }: TransactionTableProps) {
    return (
        <HorizontalScroll fixShadows>
            <Table style={{ "--columns": "2fr 2fr 1fr 3fr" }}>
                <TableHead>
                    <TableHeadCell>Date</TableHeadCell>
                    <TableHeadCell>Service</TableHeadCell>
                    <TableHeadCell>Amount</TableHeadCell>
                    <TableHeadCell>Description</TableHeadCell>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{new Date(transaction.date).toLocaleDateString("en", { dateStyle: "long" })}</TableCell>
                            <TableCell>{transaction.service}</TableCell>
                            <TableCell>
                                <Text color={transaction.amount > 0 ? "text-warning" : transaction.amount < 0 ? "text-primary" : undefined}>
                                    {currencyFormat.format(transaction.amount)}
                                </Text>
                            </TableCell>
                            <TableCell>{transaction.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </HorizontalScroll>
    );
}

export const getStaticProps: GetStaticProps<TransparencyIndexPageProps> = async () => {
    const { data, apiRequests } = await fetchData<TransparencyIndexPageQuery>(gql`
        query TransparencyIndexPage {
            balanceAll {
                id
                date
                service
                frequency
                usage
                month_to_date_balance
            }
            transactionAll {
                id
                date
                service
                description
                amount
            }
        }
    `);

    const props: TransparencyIndexPageProps = {
        ...getSharedPageProps(apiRequests),
        balanceAll: data.balanceAll,
        transactionAll: data.transactionAll,
    };

    return {
        props,
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800
    };
};
