import { MinusOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber } from "antd";
import { Table } from "semantic-ui-react";

const TabellaOrdini = ({ ordini, onRemoveRow, onChangeValueRow }) => {
  return (
    <Table celled unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Articolo</Table.HeaderCell>
          <Table.HeaderCell>Colore</Table.HeaderCell>
          <Table.HeaderCell>Codice</Table.HeaderCell>
          <Table.HeaderCell>Quantità</Table.HeaderCell>
          <Table.HeaderCell>Note</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {ordini.map((ordine, index) => (
          <TabellaRow
            key={index}
            ordine={ordine}
            disabled={ordini.length === 1}
            onRemoveRow={() => onRemoveRow(index)}
            onChangeValueRow={(key, value) =>
              onChangeValueRow(index, key, value)
            }
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default TabellaOrdini;

const TabellaRow = ({ ordine, disabled, onChangeValueRow, onRemoveRow }) => (
  <Table.Row>
    <Table.Cell width="6">
      <Input
        value={ordine.product}
        placeholder="..."
        onChange={(e) => onChangeValueRow("product", e.target.value)}
      />
    </Table.Cell>
    <Table.Cell width="2">
      <Input
        value={ordine.color}
        placeholder="#FFFFFF"
        onChange={(e) => onChangeValueRow("color", e.target.value)}
      />
    </Table.Cell>
    <Table.Cell width="2">
      <Input
        value={ordine.code}
        onChange={(e) => onChangeValueRow("code", e.target.value)}
      />
    </Table.Cell>
    <Table.Cell width="1">
      <InputNumber
        value={ordine.quantity}
        onChange={(value) => onChangeValueRow("quantity", value)}
      />
    </Table.Cell>
    <Table.Cell width="6">
      <Input
        value={ordine.note}
        onChange={(e) => onChangeValueRow("note", e.target.value)}
      />
    </Table.Cell>
    <Table.Cell width="1">
      <Button
        icon={<MinusOutlined />}
        shape="circle"
        data-tooltip={disabled ? undefined : "Rimuovi"}
        disabled={disabled}
        onClick={onRemoveRow}
      ></Button>
    </Table.Cell>
  </Table.Row>
);
