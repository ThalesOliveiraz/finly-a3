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
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Simulador de Juros Compostos
      </h2>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Valor inicial (R$)
          </label>
          <input
            type="number"
            value={initial}
            onChange={(e) => setInitial(Number(e.target.value))}
            className="w-full border-2 border-border rounded-xl px-4 py-2 focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Aporte mensal (R$)
          </label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full border-2 border-border rounded-xl px-4 py-2 focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Taxa anual (%)
          </label>
          <input
            type="number"
            value={rate}
            step="0.5"
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full border-2 border-border rounded-xl px-4 py-2 focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Periodo (anos)
          </label>
          <input
            type="number"
            value={years}
            min={1}
            max={50}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full border-2 border-border rounded-xl px-4 py-2 focus:border-primary focus:outline-none transition-colors"
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
                  className="w-full bg-primary/80 rounded-t-sm relative"
                  style={{ height: `${totalHeight}%` }}
                >
                  <div
                    className="absolute bottom-0 w-full bg-primary/90 rounded-t-sm"
                    style={{ height: `${investedHeight}%` }}
                  />
                </div>
                {/* Tooltip */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-muted text-primary-foreground text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  <p>Ano {d.year}</p>
                  <p>Total: R${d.total.toLocaleString("pt-BR")}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Ano 0</span>
          <span>Ano {years}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary/90 rounded" />
          <span className="text-muted-foreground">Valor investido</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary/80 rounded" />
          <span className="text-muted-foreground">Rendimento</span>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-muted/10 rounded-xl p-4 text-center">
          <p className="text-sm text-muted-foreground">Total investido</p>
          <p className="text-lg font-bold text-foreground">
            R$ {finalInvested.toLocaleString("pt-BR")}
          </p>
        </div>
        <div className="bg-primary/10 rounded-xl p-4 text-center">
          <p className="text-sm text-primary">Rendimentos</p>
          <p className="text-lg font-bold text-primary">
            R$ {earnings.toLocaleString("pt-BR")}
          </p>
        </div>
        <div className="bg-primary/10 rounded-xl p-4 text-center">
          <p className="text-sm text-primary">Total final</p>
          <p className="text-lg font-bold text-primary">
            R$ {finalTotal.toLocaleString("pt-BR")}
          </p>
        </div>
      </div>
    </div>
  );
}
