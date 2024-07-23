import MenuItem from './components/MenuItem';
import { menuItems } from './data/db';
import useOrder from './hooks/useOrder';
import OrderContents from './components/OrderContents';
import TipPercentageForm from './components/TipPercentageForm';
import OrderTotals from './components/OrderTotals';
import { useReducer } from 'react';
import { initialState, orderReducer } from './reducers/order-reducer';

function App() {
  const { order, removeItem, tip, setTip, placeOrder } = useOrder();

  const [state, dispatch] = useReducer(orderReducer, initialState);
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
              <MenuItem
                key={item.id}
                item={item}
                dispatch={dispatch}
              ></MenuItem>
            ))}
          </div>
        </div>

        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {state.order.length ? (
            <>
              <OrderContents
                order={state.order}
                dispatch={dispatch}
              ></OrderContents>
              <TipPercentageForm setTip={setTip} tip={tip}></TipPercentageForm>
              <OrderTotals
                order={state.order}
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
