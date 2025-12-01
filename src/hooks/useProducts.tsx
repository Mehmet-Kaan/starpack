import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../components/firebase";
import type { ProductType } from "./types";

export function useProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const cached = localStorage.getItem("products");
        const cachedUpdated = localStorage.getItem("productsLastUpdated");

        const lastCheck = sessionStorage.getItem("lastCheck");
        const now = Date.now();
        const TEN_MIN = 10 * 60 * 1000;

        let firestoreUpdated: number | null = null;

        const shouldCheck = !lastCheck || now - Number(lastCheck) > TEN_MIN;

        // Check Firestore only if needed
        if (shouldCheck) {
          const lastRef = doc(db, "products", "lastUpdated");
          const snap = await getDoc(lastRef);

          if (snap.exists()) {
            firestoreUpdated = snap.data().time.toMillis();
            localStorage.setItem(
              "productsLastUpdated",
              String(firestoreUpdated)
            );
          }

          sessionStorage.setItem("lastCheck", String(now));
        } else {
          firestoreUpdated = cachedUpdated ? Number(cachedUpdated) : null;
        }

        const mustFetch =
          !cached ||
          !cachedUpdated ||
          (firestoreUpdated && cachedUpdated !== String(firestoreUpdated));

        if (mustFetch) {
          const col = collection(db, "products");
          const snapshot = await getDocs(col);

          const data = snapshot.docs
            .filter((d) => d.id !== "lastUpdated" && d.id !== "Product Groups")
            .map((d) => d.data() as ProductType);

          localStorage.setItem("products", JSON.stringify(data));
          if (firestoreUpdated)
            localStorage.setItem(
              "productsLastUpdated",
              String(firestoreUpdated)
            );

          setProducts(data);
        } else {
          setProducts(JSON.parse(cached));
        }
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
}
