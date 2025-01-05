import React, { useState } from "react";
import { Form, Input, Select, Button, Card, Typography, Space, message } from "antd";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function ProductNameGenerator() {
  const [generatedName, setGeneratedName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const stores = [
    { name: "Amazon", description: "(International)" },
    { name: "Ali Express", description: "(International)" },
    { name: "Asda", description: "(UK)" },
    { name: "B&Q", description: "(UK)" },
    { name: "Wilko", description: "(UK)" },
    { name: "Walmart", description: "(US)" },
    { name: "Target", description: "(US)" },
    { name: "Costco", description: "(US and UK)" },
  ];

  const onFinish = async (values) => {
    setIsLoading(true);
    setGeneratedName("");

    const dimensions = `${values.length || 0}cm x ${values.width || 0}cm x ${values.height || 0}cm (${values.weight || 0}g)`;

    try {

      const response = await axios.post("/api/chat", {
        brand_name: values.brandName,
        product_name: values.productType,
        dimensions: dimensions.trim() === "0cm x 0cm x 0cm (0g)" ? null : dimensions,
        keywords: values.keywords || null,
        use_cases: values.useCases || null,
        store_name: values.store,
      });

      setGeneratedName(response.data.message);
      message.success("Product name generated successfully!");
    } catch (error) {
      console.error("Error generating product name:", error);
      message.error("Failed to generate product name. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 800, width: "37rem" }}>
      <Title level={3} style={{ textAlign: "center" }}>Product Name Generator</Title>
      <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 16 }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Form.Item
            name="brandName"
            label="Brand Name"
            rules={[{ required: true, message: "Please input the brand name!" }]}
          >
            <Input placeholder="e.g., Acme" />
          </Form.Item>
          <Form.Item
            name="productType"
            label="Product Type"
            rules={[{ required: true, message: "Please input the product type!" }]}
          >
            <Input placeholder="e.g., Arabica Coffee" />
          </Form.Item>
          <Space>
            <Form.Item name="length" label="Length (cm)">
              <Input placeholder="0" type="number" />
            </Form.Item>
            <Form.Item name="width" label="Width (cm)">
              <Input placeholder="0" type="number" />
            </Form.Item>
            <Form.Item name="height" label="Height (cm)">
              <Input placeholder="0" type="number" />
            </Form.Item>
            <Form.Item name="weight" label="Weight (g)">
              <Input placeholder="0" type="number" />
            </Form.Item>
          </Space>
          <Form.Item name="keywords" label="Keywords">
            <TextArea placeholder="e.g., Premium, High Quality, Extra Flavor" rows={2} />
          </Form.Item>
          <Form.Item name="useCases" label="Use Cases">
            <TextArea placeholder="e.g., for Coffee Machines, Quick Brew" rows={2} />
          </Form.Item>
          <Form.Item
            name="store"
            label="Store"
            rules={[{ required: true, message: "Please select a store!" }]}
          >
          <Select placeholder="Select a store">
            {stores.map((store) => (
              <Option key={store.name} value={store.name}>
                {store.name} {store.description}
              </Option>
            ))}
          </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
            >
              Generate Product Name
            </Button>
          </Form.Item>
        </Space>
      </Form>
      {generatedName && (
        <Card style={{ marginTop: 16, background: "#f6f8fa" }}>
          <Title level={4}>Generated Product Name:</Title>
          <p>{generatedName}</p>
        </Card>
      )}
    </Card>
  );
}

export default ProductNameGenerator;
