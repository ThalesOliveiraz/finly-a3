"use client";

import { useState, useMemo } from "react";

export default function SimulatorChart() {
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(100);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);

  const data = useMemo(() => {
    const points: { year: number; total: number; invested: number }[] = [];
    let total = initial;
    let invested = initial;
    const monthlyRate = rate / 100 / 12;

    for (let y = 0; y <= years; y++) {
      points.push({
        year: y,
        total: Math.round(total),
        invested: Math.round(invested),
      });
      for (let m = 0; m < 12; m++) {
        total = total * (1 + monthlyRate) + monthly;
        invested += monthly;
      }
    }
    return points;
  }, [initial, monthly, rate, years]);

  const maxValue = Math.max(...data.map((d) => d.total));
  const finalTotal = data[data.length - 1].total;
  const finalInvested = data[data.length - 1].invested;
  const earnings = finalTotal - finalInvested;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Simulador de Juros Compostos
      </h2>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Valor inicial (R$)
          </label>
          <input
            type="number"
            value={initial}
            onChange={(e) => setInitial(Number(e.target.value))}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-emerald-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Aporte mensal (R$)
          </label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-emerald-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Taxa anual (%)
          </label>
          <input
            type="number"
            value={rate}
            step="0.5"
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-emerald-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Periodo (anos)
          </label>
          <input
            type="number"
            value={years}
            min={1}
            max={50}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-emerald-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Chart (CSS bars) */}
      <div className="mb-8">
        <div className="flex items-end gap-1 h-48">
          {data.map((d, i) => {
            const totalHeight = (d.total / maxValue) * 100;
            const investedHeight = (d.invested / maxValue) * 100;
            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center justify-end h-full group relative"
              >
                <div
                  className="w-full bg-emerald-400 rounded-t-sm relative"
                  style={{ height: `${totalHeight}%` }}
                >
                  <div
                    className="absolute bottom-0 w-full bg-emerald-600 rounded-t-sm"
                    style={{ height: `${investedHeight}%` }}
                  />
                </div>
                {/* Tooltip */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  <p>Ano {d.year}</p>
                  <p>Total: R${d.total.toLocaleString("pt-BR")}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Ano 0</span>
          <span>Ano {years}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-600 rounded" />
          <span className="text-gray-600">Valor investido</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-400 rounded" />
          <span className="text-gray-600">Rendimento</span>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">Total investido</p>
          <p className="text-lg font-bold text-gray-800">
            R$ {finalInvested.toLocaleString("pt-BR")}
          </p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4 text-center">
          <p className="text-sm text-emerald-600">Rendimentos</p>
          <p className="text-lg font-bold text-emerald-700">
            R$ {earnings.toLocaleString("pt-BR")}
          </p>
        </div>
        <div className="bg-emerald-100 rounded-xl p-4 text-center">
          <p className="text-sm text-emerald-700">Total final</p>
          <p className="text-lg font-bold text-emerald-800">
            R$ {finalTotal.toLocaleString("pt-BR")}
          </p>
        </div>
      </div>
    </div>
  );
}
