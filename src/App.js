import { useState } from "react";
import {
  DownloadOutlined,
  MailOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import {
  Container,
  Divider,
  Header,
  Icon,
  Form,
  Input,
} from "semantic-ui-react";
import TabellaOrdini from "./TabellaOrdini";

const addEmptyOrder = (key = 1, color = "") => ({
  key,
  product: "",
  color,
  code: "",
  quantity: 1,
  note: "",
});

const INITIAL_STATE = {
  name: "",
  emails: [""],
  orders: [addEmptyOrder()],
};

const App = () => {
  const [dataSource, setDataSource] = useState(INITIAL_STATE);

  const onExport = () => {
    const order = dataSource.orders.map(
      (obj) =>
        [obj.product, obj.color, obj.code, obj.quantity, obj.note].join(";") +
        "\n"
    );
    const encodedUri = encodeURI(
      `data:text/csv;charset=utf-8,Cliente;${dataSource.name}\n\nProdotto;Colore;Codice_articolo;Quantita;Note\n` +
        order
    );

    console.log(encodedUri);
    window.open(encodedUri);
  };

  const onSendMail = () => console.log("Invia via email");

  const addNewEmail = () =>
    setDataSource({ ...dataSource, emails: [...dataSource.emails, ""] });

  const onAddRow = () => {
    const orders = dataSource.orders;
    setDataSource({
      ...dataSource,
      orders: [...orders, addEmptyOrder(orders.length + 1, orders[0].color)],
    });
  };

  const onRemoveRow = (index) => {
    setDataSource({
      ...dataSource,
      orders: dataSource.orders.filter((_, indexDS) => indexDS !== index),
    });
  };

  const onChangeEmail = (index, email) => {
    const emails = dataSource.emails;
    emails[index] = email;
    setDataSource({ ...dataSource, emails });
  };

  const onChangeValueOrder = (index, key, value) => {
    const orders = dataSource.orders;
    orders[index][key] = value;
    setDataSource({ ...dataSource, orders });
  };

  return (
    <Container>
      <Divider horizontal />

      <Divider horizontal>
        <Header as="h4">
          <Icon name="user" />
          Cliente
        </Header>
      </Divider>

      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Nome</label>
            <Input
              value={dataSource.name}
              placeholder="Mario Rossi"
              onChange={(e) =>
                setDataSource({ ...dataSource, name: e.target.value })
              }
            />
          </Form.Field>
          {dataSource.emails.map((email, index) => (
            <Form.Field key={index}>
              <label>Email {index + 1}</label>
              <Input
                value={email}
                placeholder="mariorossi@example.com"
                onChange={(e) => onChangeEmail(index, e.target.value)}
              />
            </Form.Field>
          ))}
        </Form.Group>
      </Form>
      <Button
        icon={<MailOutlined />}
        shape="round"
        style={{ marginTop: "2em" }}
        disabled={dataSource.emails.length > 2}
        data-tooltip={
          dataSource.emails.length > 2 ? "Limite email raggiunto" : undefined
        }
        onClick={addNewEmail}
      >
        Aggiungi email
      </Button>

      <Divider horizontal>
        <Header as="h4">
          <Icon name="shopping cart" />
          Ordine
        </Header>
      </Divider>

      <TabellaOrdini
        ordini={dataSource.orders}
        onRemoveRow={onRemoveRow}
        onChangeValueRow={onChangeValueOrder}
      />

      <Button
        icon={<PlusOutlined />}
        shape="round"
        style={{ marginTop: "2em" }}
        onClick={onAddRow}
      >
        Aggiungi articolo
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
      <Divider horizontal />
    </Container>
  );
};

export default App;
