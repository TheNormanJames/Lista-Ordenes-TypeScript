import MenuItem from './components/MenuItem';
import { menuItems } from './data/db';
import useOrder from './hooks/useOrder';
import OrderContents from './components/OrderContents';
import TipPercentageForm from './components/TipPercentageForm';
import OrderTotals from './components/OrderTotals';

function App() {
  const { order, addItem, removeItem, tip, setTip, placeOrder } = useOrder();
  return (
    <>
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">
          Calculadora de propinas y consumo
        </h1>
      </header>

      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-black mb-10">Menú</h2>
          <div className="space-y-3">
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} addItem={addItem}></MenuItem>
            ))}
          </div>
        </div>

        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {order.length ? (
            <>
              <OrderContents
                order={order}
                removeItem={removeItem}
              ></OrderContents>
              <TipPercentageForm setTip={setTip} tip={tip}></TipPercentageForm>
              <OrderTotals
                order={order}
                tip={tip}
                placeOrder={placeOrder}
              ></OrderTotals>
            </>
          ) : (
            <p className="text-center">La orden está vacia</p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;