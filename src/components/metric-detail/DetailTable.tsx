
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableItem {
  name: string;
  status: string;
  date: string;
  grade: string;
}

interface DetailTableProps {
  metricTitle: string;
  tableData: TableItem[];
}

const DetailTable = ({ metricTitle, tableData }: DetailTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Breakdown</CardTitle>
        <CardDescription>
          Individual records related to {metricTitle.toLowerCase()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Grade/Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DetailTable;
