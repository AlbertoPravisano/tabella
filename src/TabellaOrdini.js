import { MinusOutlined } from "@ant-design/icons";
import { Button, ColorPicker, Input, InputNumber } from "antd";
import { Table } from "semantic-ui-react";

const TabellaOrdini = ({ dataSource, onRemoveRow, onChangeValueRow }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Articolo</Table.HeaderCell>
          <Table.HeaderCell>Colore interno</Table.HeaderCell>
          <Table.HeaderCell>Colore esterno</Table.HeaderCell>
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
    <Table.Cell width="6">
      <Input
        value={row.name}
        placeholder="Nome articolo..."
        onChange={(e) => onChangeValueRow("name", e.target.value)}
      />
    </Table.Cell>
    <Table.Cell width="1">
      <ColorPicker
        value={row.intColor}
        showText
        onChange={(_, value) => onChangeValueRow("intColor", value)}
      />
    </Table.Cell>
    <Table.Cell width="1">
      <ColorPicker
        value={row.extColor}
        showText
        onChange={(_, value) => onChangeValueRow("extColor", value)}
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
