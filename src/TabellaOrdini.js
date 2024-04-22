import { MinusOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber } from "antd";
import { Table } from "semantic-ui-react";

const TabellaOrdini = ({ dataSource, onRemoveRow, onChangeValueRow }) => {
  return (
    <Table celled unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Cliente</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Colore</Table.HeaderCell>
          <Table.HeaderCell>Codice art.</Table.HeaderCell>
          <Table.HeaderCell>Quantità</Table.HeaderCell>
          <Table.HeaderCell>Note</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {dataSource.map((row, index) => (
          <TabellaRow
            key={index}
            row={row}
            disabled={dataSource.length === 1}
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

const TabellaRow = ({ row, disabled, onChangeValueRow, onRemoveRow }) => (
  <Table.Row>
    <Table.Cell width="2">
      <Input
        value={row.name}
        placeholder="Mario Rossi"
        onChange={(e) => onChangeValueRow("name", e.target.value)}
      />
    </Table.Cell>
    <Table.Cell width="4">
      <Input
        value={row.email}
        placeholder="mariorossi@gmail.com"
        onChange={(e) => onChangeValueRow("email", e.target.value)}
      />
    </Table.Cell>
    <Table.Cell width="2">
      <Input
        value={row.color}
        placeholder="#FFFFFF"
        onChange={(e) => onChangeValueRow("color", e.target.value)}
      />
    </Table.Cell>
    <Table.Cell width="2">
      <Input
        value={row.code}
        onChange={(e) => onChangeValueRow("code", e.target.value)}
      />
    </Table.Cell>
    <Table.Cell width="1">
      <InputNumber
        value={row.quantity}
        onChange={(value) => onChangeValueRow("quantity", value)}
      />
    </Table.Cell>
    <Table.Cell width="6">
      <Input
        value={row.note}
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
