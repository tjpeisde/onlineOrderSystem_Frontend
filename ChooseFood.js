import { Button, Card, List, message, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getMenus, getCatalogs, getAllMenuItems } from "../utils";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddToCartButton = ({ itemId }) => {
  const [loading, setLoading] = useState(false);

  const AddToCart = () => {
    setLoading(true);
    addItemToCart(itemId)
      .then(() => message.success(`Successfully add item`))
      .catch((err) => message.error(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Tooltip title="Add to shopping cart">
      <Button
        loading={loading}
        type="primary"
        icon={<PlusOutlined />}
        onClick={AddToCart}
      />
    </Tooltip>
  );
};

const select = {
  'width': 300,
  'position': 'relative',
  'bottom': '9%',
}

const list = {
  'position': 'relative',
  'bottom': '7%',
  'marginTop': '20',
  
}


const FoodList = () => {
  const [foodData, setFoodData] = useState([]);
  const [curRest, setCurRest] = useState();
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRest, setLoadingRest] = useState(false);

  useEffect(() => {
    setLoadingRest(true);
    getCatalogs()
      .then((data) => {
        setCatalogs(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoadingRest(false);
      });
  }, []);

  useEffect(() => {
    setLoadingRest(true);
    getAllMenuItems()
      .then((data) => {
        setFoodData(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoadingRest(false);
      });
  }, []);

  useEffect(() => {
    if (curRest) {
      setLoading(true);
      getMenus(curRest)
        .then((data) => {
          setFoodData(data);
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [curRest]);

  return (
    <>
      <Select
        value={curRest}
        onSelect={(value) => setCurRest(value)}
        placeholder="Select by catalog"
        loading={loadingRest}
        style={select}
        onChange={() => { }}
      >
        {catalogs.map((item) => {
          return <Option value={item.id}>{item.name}</Option>;
        })}
      </Select>

      <List
        style={list}
        loading={loading}
        grid={{
          gutter: 12,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={foodData}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={item.name}
              extra={<AddToCartButton itemId={item.id} />}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ height: "100%", width: "100%", display: "block" }}
              />
              {`Price:   $ ${item.price}`}
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default FoodList;
