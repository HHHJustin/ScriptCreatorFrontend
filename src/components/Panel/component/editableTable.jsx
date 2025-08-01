import { DataAreaWrapper, Table, Th, Tr, Td, CenteredTd, StyledButton, StyledSelect, EditableTextArea } from "../modalStyle";

const EditableTable = ({ columns, data, onCreate, onDelete, onUpdate, createText = "建立" }) => {
  return (
    <DataAreaWrapper>
      <Table>
        <thead>
          <tr>
            {columns.map(col => (
              <Th key={col.key} style={{ textAlign: col.align, width: col.width }}>{col.label}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map(col => (
                <Td key={col.key} style={{ textAlign: col.align }}>
                  {col.render
                    ? col.render(row, rowIndex)
                    : row[col.key] || "—"}
                </Td>
              ))}
            </Tr>
          ))}
          <Tr>
            <CenteredTd>New</CenteredTd>
            {columns.slice(1, -1).map((_, idx) => (
              <CenteredTd key={idx} />
            ))}
            <CenteredTd>
              <StyledButton onClick={onCreate}>{createText}</StyledButton>
            </CenteredTd>
          </Tr>
        </tbody>
      </Table>
    </DataAreaWrapper>
  );
};

export default EditableTable;
