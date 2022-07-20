import {
  Table,
  Thead,
  Tr,
  Th,
  TableContainer,
} from "@chakra-ui/react";



const ResultsTable = ({results}) => {
  console.log(results)
  return (
    <>
      {results ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Make ID</Th>
                <Th>Make Name</Th>
                <Th>Model ID</Th>
                <Th>Model Name</Th>
              </Tr>
              {results &&
                results.map((result) => {
                  return (
                    <Tr key={result.Model_ID}>
                      <Th>{result.Make_ID}</Th>
                      <Th>{result.Make_Name}</Th>
                      <Th> {result.Model_ID}</Th>
                      <Th>{result.VehicleTypeName}</Th>
                    </Tr>
                  );
                })}
            </Thead>
          </Table>
        </TableContainer>
      ) : (
        <p>No results found</p>
      )}
    </>
  );
}

export default ResultsTable;