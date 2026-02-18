export const formatRupiah = (value) => {
  if (!value) return "Rp 0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export const calculateDiscountPrice = (price, discountPercentage) => {
  if (!price) return 0;

  const discount = discountPercentage || 0;
  const finalPrice = price - price * (discount / 100);

  return finalPrice;
};
