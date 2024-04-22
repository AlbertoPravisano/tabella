import { useState } from "react";
import {
  DownloadOutlined,
  MailOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Container, Divider, Button as UiButton } from "semantic-ui-react";
import TabellaOrdini from "./TabellaOrdini";

const generateNewRow = (key = 1, color = "") => ({
  key,
  name: "",
  email: "",
  color,
  code: "",
  quantity: 1,
  note: "",
});

const App = () => {
  const [dataSource, setDataSource] = useState([generateNewRow()]);
  const [isPreventivo, setIsPreventivo] = useState(false);

  const onExport = () => {
    const values = dataSource.map(
      (obj) =>
        [obj.name, `"${obj.color}"`, obj.code, obj.quantity, obj.note].join(
          ";"
        ) +
        (isPreventivo ? ";SI" : ";NO") +
        "\n"
    );
    const encodedUri = encodeURI(
      "data:text/csv;charset=utf-8,Cliente;Colore;Codice_articolo;Quantita;Note;Preventivo\n" +
        values
    );

    console.log(encodedUri);
    window.open(encodedUri);
  };

  const onSendMail = () => console.log("Invia via email");

  const onAddRow = () => {
    setDataSource([
      ...dataSource,
      generateNewRow(dataSource.length + 1, dataSource[0].color),
    ]);
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
      <UiButton.Group fluid>
        <UiButton
          positive={!isPreventivo}
          onClick={() => setIsPreventivo(false)}
        >
          Ordine
        </UiButton>
        <UiButton.Or text="o" />
        <UiButton positive={isPreventivo} onClick={() => setIsPreventivo(true)}>
          Preventivo
        </UiButton>
      </UiButton.Group>
      <TabellaOrdini
        dataSource={dataSource}
        onRemoveRow={onRemoveRow}
        onChangeValueRow={onChangeValueRow}
      />

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
