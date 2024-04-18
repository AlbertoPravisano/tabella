import { useState } from "react";
import {
  DownloadOutlined,
  MailOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, ColorPicker, Input, InputNumber } from "antd";
import { Container, Divider, Header, Table } from "semantic-ui-react";

const EMPTY_ROW = {
  name: "",
  intColor: "#FFFFFF",
  extColor: "#000000",
  quantity: 1,
  note: "",
};

const App = () => {
  const [dataSource, setDataSource] = useState([EMPTY_ROW]);

  const onExport = () => {
    const values = dataSource.map(
      (obj) =>
        [
          obj.name,
          `"${obj.intColor}"`,
          `"${obj.extColor}"`,
          obj.quantity,
          obj.note,
        ].join(";") + "\n"
    );
    const encodedUri = encodeURI(
      "data:text/csv;charset=utf-8,Nome;Colore_interno;Colore_esterno;Quantita;Note\n" +
        values
    );

    console.log(encodedUri);
    window.open(encodedUri);
  };

  const onSendMail = () => console.log("Invia via email");

  const onAddRow = () => {
    setDataSource([...dataSource, EMPTY_ROW]);
  };

  const onRemoveRow = (index) => {
    setDataSource(dataSource.filter((_, indexDS) => indexDS !== index));
  };

  const onChangeValueRow = (index, key, value) => {
    const newData = [...dataSource];
    newData[index][key] = value;
    setDataSource(newData);
  };

  return (
    <Container>
      <Divider horizontal />
      <Header as="h1">Ordine cliente</Header>
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

      <Button
        icon={<PlusOutlined />}
        shape="round"
        style={{ marginTop: "2em" }}
        onClick={onAddRow}
      >
        Aggiungi riga
      </Button>
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        shape="round"
        style={{ float: "right", marginTop: "2em" }}
        onClick={onExport}
      >
        Esporta
      </Button>
      <Button
        type="dashed"
        icon={<MailOutlined />}
        shape="round"
        style={{ float: "right", marginRight: "1em", marginTop: "2em" }}
        onClick={onSendMail}
      >
        Invia via email
      </Button>
    </Container>
  );
};

export default App;

const TabellaRow = ({ row, disabled, onChangeValueRow, onRemoveRow }) => {
  return (
    <Table.Row>
      <Table.Cell width="6">
        <Input
          value={row.name}
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
};
