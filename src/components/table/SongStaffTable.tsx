import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "@/components/table/Table";
import { Text } from "@/components/text/Text";
import { getDisplayedArtistName } from "@/components/utils/Performances";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const SONG_STAFF_TABLE = graphql(`
    fragment SongStaffTableStaff on SongStaff {
        alias
        as
        relevance
        role
        artist {
            id
            slug
            name {
                main
            }
        }
    }
`);

export interface SongStaffTableProps {
    staffs: Array<FragmentType<typeof SONG_STAFF_TABLE>> | null;
}

export function SongStaffTable({ staffs: staffsFragment }: SongStaffTableProps) {
    if (!staffsFragment) return null;

    const staffs = getFragmentData(SONG_STAFF_TABLE, staffsFragment);

    const songStaff = Map.groupBy(
        (staffs ?? [])
            .toSorted(({ relevance: a }, { relevance: b }) => a - b)
            .filter((staff, index, array) =>
                array.findIndex(({ artist, role }) => artist.id === staff.artist.id && role === staff.role) === index
            ),
        ({ role }) => role
    );

    if (staffs.length === 0) return null;

    return (
        <Table style={{ "--columns": "1fr 3fr" }}>
            <TableHead>
                <TableHeadCell>Role</TableHeadCell>
                <TableHeadCell>Artists</TableHeadCell>
            </TableHead>
            <TableBody>
                {[...songStaff].map(([id, staff]) =>
                    staff && (
                        <TableRow key={id}>
                            <TableCell>
                                <Text weight="600">
                                    {staff[0].role}
                                </Text>
                            </TableCell>
                            <TableCell>
                                {staff.flatMap(({ alias, as, artist }, index) => [
                                    ...(index > 0 ? [index === staff.length - 1 ? ' & ' : ', '] : []),
                                    <Text key={artist.id} color="text-primary" weight="600" as={Link} href={`/artist/${artist.slug}`}>
                                        {getDisplayedArtistName({ alias, as, artist })}
                                    </Text>,
                                ])}
                            </TableCell>
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    );
}