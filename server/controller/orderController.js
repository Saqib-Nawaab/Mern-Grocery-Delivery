import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe";

export const placeOrderCOD = async (req, res) => {
  try {
    const { address, items } = req.body;

    const { userId } = req;

    

    if (!address || !userId || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      }); 
    }

    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02);

    const orderItems = items.map((item) => ({
      product: item.product,
      quantity: item.quantity.toString(),
    }));

    const order = await Order.create({
      address,
      userId,
      items: orderItems,
      amount,
      paymentType: "COD",
    });

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order Placement Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

// export const placeOrderStripe = async (req, res) => {
//   try {
//     const { address, userId, items } = req.body;
//     const origin = req.headers.origin;

//     if (!address || !userId || !items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//       });
//     }

//     let amount = 0;
//     const productData = [];

//     for (const item of items) {
//       const product = await Product.findById(item.product);
//       if (!product) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Product not found" });
//       }
//       const itemTotal = product.offerPrice * item.quantity;
//       amount += itemTotal;
//       productData.push({
//         name: product.name,
//         price: product.offerPrice,
//         quantity: item.quantity,
//       });
//     }

//     amount += Math.floor(amount * 0.02); // Tax

//     const orderItems = items.map((item) => ({
//       product: item.product,
//       quantity: item.quantity.toString(),
//     }));

//     const order = await Order.create({
//       address,
//       userId,
//       items: orderItems,
//       amount,
//       paymentType: "Online",
//     });

//     const line_items = productData.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: Math.floor(item.price * 1.02 * 100), 
//       },
//       quantity: item.quantity,
//     }));

//     const session = await stripeInstance.checkout.sessions.create({
//       line_items,
//       mode: "payment",
//       success_url: `${origin}/loader?next=/my-orders`,
//       cancel_url: `${origin}/cart`,
//       metadata: {
//         orderId: order._id.toString(),
//         userId,
//       },
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Order placed successfully",
//       url: session.url,
//     });
//   } catch (error) {
//     console.error("Stripe Order Placement Error:", error.message);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };

export const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Get User Orders Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Get All Orders Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
