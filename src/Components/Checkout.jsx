import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Checkout = () => {
  const loc = useLocation();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    address: "",
    country: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const shipping_address = {
      first_name: formData.fname,
      last_name: formData.lname,
      address: formData.address,
      email: formData.email,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      postcode: formData.pincode,
      phone_number: formData.mobile,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    const options = {
      key: "rzp_test_vv1FCZvuDRF6lQ",
      key_secret: "P4JAUwn4VdE6xDLJ6p2Zy8RQ",
      amount: parseInt(loc.state) * 100,
      currency: "INR",
      name: "Shop Cart",
      description: "for testing purpose",
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;
        console.log("Payment ID:", paymentId, shipping_address);

        setFormData({
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          address: "",
          country: "",
          city: "",
          state: "",
          pincode: "",
        });
      },
      theme: {
        color: "#07a291db",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 6, mb: 6 }} minHeight='100vh'>
        <Card elevation={4}>
          <CardContent>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ color: "#07a291db", fontWeight: "bold" }}
            >
              Checkout Form
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="tel"
                    label="Mobile"
                    name="mobile"
                    inputProps={{ maxLength: 10 }}
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 4,
                  backgroundColor: "#07a291db",
                  "&:hover": { backgroundColor: "#068f81" },
                  fontSize: "18px",
                }}
              >
                Pay ₹{loc.state}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;
