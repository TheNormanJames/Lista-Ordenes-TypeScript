import { useMemo } from 'react';
import { formatCurrency } from '../helpers/index';
import { OrderItem } from '../types';
import { OrderActions } from '../reducers/order-reducer';

type OrderTotalProps = {
  order: OrderItem[];
  tip: number;
  dispatch: React.Dispatch<OrderActions>;
};
export default function OrderTotals({ order, tip, dispatch }: OrderTotalProps) {
  const subtotalAmount = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );
  const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order]);

  const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order]);

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y Propina:</h2>
        <p>
          Subtotal a pagar:
          <span className="font-bold">{formatCurrency(subtotalAmount)}</span>
        </p>
        <p>
          Propina:
          <span className="font-bold">{formatCurrency(tipAmount)}</span>
        </p>
        <p>
          Total a pagar:
          <span className="font-bold">{formatCurrency(totalAmount)}</span>
        </p>
      </div>
      <button
        className="w-full bg-black p-3 text-white uppercase font-bold disabled:opacity-10"
        disabled={totalAmount === 0}
        onClick={() => dispatch({ type: 'place-order' })}
      >
        Guardar Orden
      </button>
    </>
  );
}
