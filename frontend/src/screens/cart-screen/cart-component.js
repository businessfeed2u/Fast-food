import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  ListGroup,
  Form,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LocationSearchInput from "../../components/input-fields/PlacesAutocomplete";
import SelectField from "../../components/input-fields/SelectField";
import { paymentOptions } from "../../data/payment";

const CartComponent = ({
  cartItems,
  handleClearCart,
  handleRemoveFromCart,
  increaseQty,
  decreaseQty,
  totalPrice,
  handleChange,
  handleSubmit,
  handleBlur,
  errors,
  values,
  touched,
  userInfo,
  payStackProps,
}) => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={8} className="py-2">
            <Button onClick={handleClearCart} variant="outline-dark">
              <i className="fas fa-trash"> Clear cart </i>
            </Button>
            {cartItems.map((item, index) => {
              return (
                <Card className="py-2 my-2" key={index}>
                  <Row>
                    <Col sm={2} className="mt-2">
                      <Image src={item.image} fluid thumbnail />
                    </Col>
                    <Col sm={3} className="mt-2">
                      <Card.Title>{item.name}</Card.Title>
                    </Col>
                    <Col sm={2} className="mt-2">
                      Price: GH₵ <strong>{item.price}</strong>
                    </Col>
                    <Col sm={2} className="mt-2">
                      <Button
                        variant="outline-dark"
                        onClick={() => decreaseQty(item)}
                      >
                        <i className="fas fa-minus"></i>
                      </Button>{" "}
                      {item.qtyToBuy}{" "}
                      <Button
                        variant="outline-dark"
                        onClick={() => increaseQty(item)}
                      >
                        <i className="fas fa-plus"></i>
                      </Button>
                    </Col>

                    <Col xs={2} className="mt-2">
                      <Button
                        variant="outline-dark"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </Col>
          <Col md={4} className="py-2">
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{cartItems.length} Food(s) In Cart</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Delivery Fee : </strong>{" "}
                  {cartItems.length === 0 ? `GH₵ 0` : `GH₵ 10`}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Total Price : </strong>GH₵{" "}
                  {cartItems.length === 0 ? ` 0` : totalPrice}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      {/* <TextField
                        onChange={handleChange}
                        name="address"
                        placeholder="Legon Campus"
                        onBlur={handleBlur}
                        touched={touched}
                        label="Delivery Location"
                        errors={errors}
                        values={values}
                        size="sm"
                      /> */}
                      <LocationSearchInput
                        onChange={handleChange}
                        name="address"
                        errors={errors}
                        touched={touched}
                        label="Delivery Location"
                        defaultValue={values?.address}
                      />
                    </Form.Group>
                    <Form.Group>
                      <SelectField
                        onChange={handleChange}
                        options={paymentOptions}
                        name="paymentMethod"
                        errors={errors}
                        touched={touched}
                      />
                    </Form.Group>

                    <Form.Group className="mt-3 d-flex justify-content-between">
                      <Button
                        type="submit"
                        variant="outline-dark"
                        disabled={cartItems.length === 0 ? true : false}
                      >
                        <i className="fas fa-truck"> Proceed </i>
                      </Button>

                      <NavLink to="/">
                        <Button variant="outline-danger">
                          <i className="fas fa-arrow-left"> Go Back </i>
                        </Button>
                      </NavLink>
                    </Form.Group>
                  </Form>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartComponent;
