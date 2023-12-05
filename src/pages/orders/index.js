const { useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");

function OrderPage() {
  const dispatch = useDispatch();
  
  const notif = useSelector((state) => state.notif);
  const orders = useSelector((state) => state.orders);
  
  let [isShowed, setIsShowed] = React.useState(false);
  
  useEffect(() => {
    dispatch(fetchOrders)
  })
}