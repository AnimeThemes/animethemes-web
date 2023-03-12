import type { GetStaticPaths, GetStaticProps } from "next";
import { fetchData } from "lib/server";
import gql from "graphql-tag";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import { Text } from "components/text";
import { SEO } from "components/seo";
import type { TransparencyPageAllQuery, TransparencyPageMonthsQuery, TransparencyPageQuery } from "generated/graphql";
import { Table } from "components/table";
import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "components/table/Table";
import { groupBy, uniq } from "lodash-es";
import type { Comparator } from "utils/types";
import { Row } from "components/box";
import { HorizontalScroll } from "components/utils/HorizontalScroll";
import fetchStaticPaths from "utils/fetchStaticPaths";
import type { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { Listbox2, Listbox2Option } from "components/listbox/Listbox2";

interface TransparencyPageProps extends SharedPageProps, TransparencyPageQuery {
    month: string;
    months: string[];
}

interface TransparencyPageParams extends ParsedUrlQuery {
    month: string[];
}

interface HasDate {
    date: string;
}

const sortByDateDesc: Comparator<HasDate> =
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime();

const toFormattedString = (date: Date) => (
    date.toLocaleDateString("en", {
        month: "long",
        year: "numeric",
    })
);

const currencyFormat = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
});

export default function TransparencyPage({ month, months, balanceAll, transactionAll }: TransparencyPageProps) {
    const router = useRouter();

    months.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    balanceAll.sort(sortByDateDesc);
    transactionAll.sort(sortByDateDesc);

    return (
        <>
            <SEO title="Transparency"/>
            <Row $wrap style={{ "--gap": "16px", "--justify-content": "space-between", "--align-items": "center" }}>
                <Text variant="h1">Transparency</Text>
                <Listbox2 value={month} onValueChange={(newMonth) => router.push(`/about/transparency/${newMonth}`)}>
                    {months.map((month) => (
                        <Listbox2Option key={month} value={month}>{toFormattedString(new Date(month))}</Listbox2Option>
                    ))}
                </Listbox2>
            </Row>
            <Text variant="h2">Balances</Text>
            {balanceAll.length ? (
                <BalanceTable balances={balanceAll}/>
            ) : (
                <Text>No results found.</Text>
            )}
            <Text variant="h2">Transactions</Text>
            {transactionAll.length ? (
                <TransactionTable transactions={transactionAll}/>
            ) : (
                <Text>No results found.</Text>
            )}
        </>
    );
}

interface BalanceTableProps {
    balances: TransparencyPageProps["balanceAll"];
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
    transactions: TransparencyPageProps["transactionAll"];
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

TransparencyPage.fragments = {
    balanceAll: gql`
        fragment TransparencyPageBalanceAll on Balance {
            id
            date
            service
            frequency
            usage
            month_to_date_balance
        }
    `,
    transactionAll: gql`
        fragment TransparencyPageTransactionAll on Transaction {
            id
            date
            service
            description
            amount
        }
    `,
};

const buildTimeCache = {
    pageQueries: new Map<string, TransparencyPageQuery>(),
    months: null as string[] | null,
};

export const getStaticProps: GetStaticProps<TransparencyPageProps, TransparencyPageParams> = async ({ params }) => {
    let months = buildTimeCache.months;
    let apiRequestsTotal = 0;

    if (!months) {
        const { data, apiRequests } = await fetchData<TransparencyPageMonthsQuery>(gql`
            query TransparencyPageMonths {
                billingMonthAll
            }
        `);

        months = data.billingMonthAll;
        apiRequestsTotal += apiRequests;
    }

    months = months.sort().map((month) => month.substring(0, 7));

    const month = params?.month?.[0] ?? months[months.length - 1];

    let data = month && buildTimeCache.pageQueries.get(month);

    if (!data) {
        const result = await fetchData<TransparencyPageQuery>(gql`
            ${TransparencyPage.fragments.balanceAll}
            ${TransparencyPage.fragments.transactionAll}

            query TransparencyPage($month: String!) {
                balanceAll(month: $month) {
                    ...TransparencyPageBalanceAll
                }
                transactionAll(month: $month) {
                    ...TransparencyPageTransactionAll
                }
            }
        `, { month });

        data = result.data;
        apiRequestsTotal += result.apiRequests;
    }

    if (!data.balanceAll?.length && !data.transactionAll?.length) {
        return {
            notFound: true
        };
    }

    const props: TransparencyPageProps = {
        ...getSharedPageProps(apiRequestsTotal),
        month,
        months,
        balanceAll: month ? data.balanceAll.filter((balance) => balance.date.startsWith(month)) : [],
        transactionAll: month ? data.transactionAll.filter((transaction) => transaction.date.startsWith(month)) : [],
    };

    return {
        props,
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800
    };
};

export const getStaticPaths: GetStaticPaths<TransparencyPageParams> = () => {
    return fetchStaticPaths(async () => {
        const { data } = await fetchData<TransparencyPageAllQuery>(gql`
            ${TransparencyPage.fragments.balanceAll}
            ${TransparencyPage.fragments.transactionAll}

            query TransparencyPageAll {
                balanceAll {
                    ...TransparencyPageBalanceAll
                }
                transactionAll {
                    ...TransparencyPageTransactionAll
                }
            }
        `);

        const items = [...data.balanceAll, ...data.transactionAll];
        const months = uniq(items.map((entry) => entry.date.substring(0, 7)));

        const balancesByMonth = groupBy(data.balanceAll, (balance) => balance.date.substring(0, 7));
        const transactionsByMonth = groupBy(data.transactionAll, (transaction) => transaction.date.substring(0, 7));

        months.forEach((month) => buildTimeCache.pageQueries.set(month, {
            balanceAll: balancesByMonth[month] ?? [],
            transactionAll: transactionsByMonth[month] ?? [],
        }));
        buildTimeCache.months = months;

        return [
            {
                params: {
                    month: [],
                },
            },
            ...months.map((month) => ({
                params: {
                    month: [month],
                },
            }))
        ];
    });
};
