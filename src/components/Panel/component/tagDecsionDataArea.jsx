import { DataAreaWrapper, Th, Tr, Td, BranchGoNextNode, Table,
  CenteredTd, StyledButton
} from "../modalStyle";
import { useParams } from "react-router-dom";

const columns = [
  { key: 'id', label: '編號', align: 'center', width: '20%' },
  { key: 'tags', label: '標籤', align: 'center', width: '40%' },
  { key: 'action', label: '動作', align: 'center', width: '25%' },
  { key: 'extra', label: '前往', align: 'center', width: '15%' },
];

const TagDecisionDataArea = ({ node, messages, tags, onRefresh }) => {
    console.log(messages);
    const allData = Array.isArray(messages)
    ? messages
        .filter(item => typeof item.Index === 'number')
        .map(({ Index, TagOperation }) => ({
            id: Index,
            tagName: TagOperation?.TagName || '—',
            operationType: TagOperation.OperationType || '—',
            tagOperationID: TagOperation.TagOperationID,
        }))
    : [];
    const { channel } = useParams();
    const currentIDInt = parseInt(node.id, 10);
    const handleSubmit = async () => {
      try {
        const res = await fetch(`/api/${channel}/tagDecisions/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentNodeID: currentIDInt })
        });
        if (res.ok) onRefresh && onRefresh();
        else alert('建立失敗');
      } catch (err) {
        console.error('Error:', err);
        alert('建立失敗');
      }
    };
    return (
      <DataAreaWrapper>
        <Table>
          <thead>
            <tr>
              {columns.map((col) => (
                <Th key={col.key}>
                  {col.label}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allData.map((item) => (
              <Tr key={item.id}>
                {columns.map((col) => (
                  <Td
                    key={col.key}
                    style={{
                      textAlign: col.align,
                      width: col.width,
                      whiteSpace: col.key === 'content' ? 'normal' : 'nowrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {item[col.key]}
                  </Td>
                ))}
                <Td style={{ textAlign: 'center' }}>
                  <BranchGoNextNode onClick={() => onGoNext(item.id)}>▶︎</BranchGoNextNode>
                </Td>
              </Tr>
            ))}
             <Tr>
              <CenteredTd>New</CenteredTd>
              <CenteredTd />
              <CenteredTd>
                <StyledButton onClick={handleSubmit}>建立</StyledButton>
              </CenteredTd>
              <CenteredTd />
            </Tr>
          </tbody>
        </Table>
      </DataAreaWrapper>
    );
  };

  export default TagDecisionDataArea;