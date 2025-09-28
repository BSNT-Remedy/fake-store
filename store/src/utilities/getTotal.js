export function getTotalPrice({items}) {
    if(!items) return 0;
    return items.reduce((totalPrice, item) => totalPrice + item.price, 0);
}