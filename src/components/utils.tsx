import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase"; // adjust import to your setup
import axios from "axios";
import type { ProductOnBackend } from "../hooks/types";

/**
 * Fetch all orders for the current user
 * @param {object} currentUser - Firebase Auth user object
 * @returns {Promise<Array>} Array of order objects
 */
export const getUserOrders = async (currentUser: any) => {
  if (!currentUser) {
    console.warn("⚠️ No user logged in — cannot fetch orders");
    return [];
  }

  try {
    // 1️⃣ Get reference to user's orders subcollection
    const ordersRef = collection(db, "users", currentUser.uid, "orders");

    // 2️⃣ Fetch all documents inside /orders
    const snapshot = await getDocs(ordersRef);

    // 3️⃣ Map each document to a plain JS object
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`📦 Fetched ${orders.length} orders for ${currentUser.email}`);
    return orders;
  } catch (err) {
    console.error("🔥 Error fetching user orders:", err);
    return [];
  }
};

export const getNewID = (id: string) => {
  let newId = parseInt(id) + 1;
  return JSON.stringify(newId);
};

// export default { getNewID };

//Deletes all the products on Firestore
export const deleteAllProducts = async () => {
  try {
    const productsCollection = collection(db, "products");
    const snapshot = await getDocs(productsCollection);

    for (const docSnap of snapshot.docs) {
      // Skip the "lastUpdated" doc if you have one
      if (docSnap.id === "lastUpdated") continue;

      await deleteDoc(doc(db, "products", docSnap.id));
      console.log("Deleted product:", docSnap.id);
    }

    console.log("✅ All products deleted from Firestore!");
  } catch (err) {
    console.error("Error deleting products:", err);
  }
};

//Gets all products from Backend
export async function getProducts() {
  const productsRes = await axios.get("http://localhost:5001/products");
  const productsData = productsRes.data.products;

  return productsData;
}

// Add all products to Firestore (one-time use)
export const addAllProductsToFirestore = async () => {
  const products = await getProducts();

  try {
    const productsCollection = collection(db, "products");

    products.forEach(async (p: any, index: any) => {
      const docRef = doc(productsCollection, getNewID(index));

      const productData = {
        id: docRef.id,
        name: p.Name,
        description: p.Description,
        price: p.price,
        cost: p.cost,
        group: p.group,
        originalName: p.originalName,
        image: p.image || null,
        lastUpdated: serverTimestamp(),
      };

      await setDoc(docRef, productData);
      console.log(
        "Added product:",
        p.Name,
        "with ID:",
        docRef.id,
        "at index:",
        index
      );

      setTimeout(() => {
        console.log("Waiting to avoid rate limits...");
      }, 3000);
    });

    console.log("All products added to Firestore successfully!");
  } catch (err) {
    console.error("Error adding products to Firestore:", err);
  }
};

//Adds a single product
export const addSingleProductToFirestore = async (
  product: ProductOnBackend,
  index: number
) => {
  try {
    const productsCollection = collection(db, "products");

    const docRef = doc(productsCollection, getNewID(index.toString()));

    function sanitizeProduct(obj: any): any {
      if (Array.isArray(obj)) {
        return obj.map(sanitizeProduct);
      } else if (obj && typeof obj === "object") {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => {
            if (value === undefined) return [key, null]; // replace undefined with null
            return [key, sanitizeProduct(value)]; // recurse
          })
        );
      }
      return obj;
    }

    // Usage:
    const productData = {
      id: docRef.id,
      name: product.Name,
      description: product.Description,
      price: product.price,
      cost: product.cost,
      group: product.group,
      originalName: product.originalName,
      image: product.image || null,
      lastUpdated: serverTimestamp(),
    };

    const sanitizedProduct = sanitizeProduct(productData);

    await setDoc(docRef, sanitizedProduct);
    console.log(
      "Added product:",
      product.Name,
      "with ID:",
      docRef.id,
      "at index:",
      index
    );
  } catch (error) {
    console.log(error);
  }
};

//Add first 3 products for test reason
export const addFirstThreeProductsToFireStore = async () => {
  let allproducts = await getProducts();

  for (let index = 0; index < 3; index++) {
    const element = allproducts[index];
    if (!element) continue;

    try {
      await addSingleProductToFirestore(element, index);
      console.log("Added:", element.Name);
    } catch (err) {
      console.error("Failed to add product:", element, err);
    }
  }
};
