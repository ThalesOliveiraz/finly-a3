export interface Question {
  id: number;
  type: "multiple_choice" | "true_false" | "fill_blank";
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  example: string;
  questions: Question[];
}

export interface Phase {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

export const phases: Phase[] = [
  {
    id: 1,
    title: "Introducao ao Dinheiro",
    description: "Aprenda o basico sobre dinheiro e como ele funciona",
    icon: "coins",
    color: "#58CC02",
    lessons: [
      {
        id: 1,
        title: "O que e dinheiro?",
        content:
          "Dinheiro e um meio de troca que usamos para comprar coisas e servicos. Antigamente, as pessoas trocavam mercadorias diretamente (escambo). Hoje, usamos moedas, notas e dinheiro digital.",
        example:
          "Imagine que voce quer comprar um lanche na escola. Em vez de trocar um caderno por um salgado, voce usa dinheiro - que todo mundo aceita como pagamento.",
        questions: [
          {
            id: 1,
            type: "multiple_choice",
            question: "O que e dinheiro?",
            options: [
              "Apenas moedas de metal",
              "Um meio de troca para comprar bens e servicos",
              "Algo que so adultos podem usar",
              "Apenas notas de papel",
            ],
            answer: "Um meio de troca para comprar bens e servicos",
            explanation:
              "Dinheiro e qualquer meio de troca aceito por todos para comprar bens e servicos. Pode ser fisico (moedas e notas) ou digital.",
          },
          {
            id: 2,
            type: "true_false",
            question:
              "Escambo e o nome dado a troca direta de mercadorias, sem usar dinheiro.",
            options: ["Verdadeiro", "Falso"],
            answer: "Verdadeiro",
            explanation:
              "Correto! Escambo e a troca direta de produtos ou servicos, sem intermediacao de dinheiro.",
          },
          {
            id: 3,
            type: "multiple_choice",
            question: "Qual dessas opcoes NAO e uma forma de dinheiro?",
            options: [
              "Moedas",
              "Notas de papel",
              "PIX",
              "Um caderno escolar",
            ],
            answer: "Um caderno escolar",
            explanation:
              "Um caderno escolar e um produto, nao uma forma de dinheiro. Moedas, notas e PIX sao formas de dinheiro.",
          },
        ],
      },
      {
        id: 2,
        title: "Receitas e Despesas",
        content:
          "Receita e todo dinheiro que entra (mesada, presente, trabalho). Despesa e todo dinheiro que sai (lanche, jogos, roupas). Saber a diferenca e o primeiro passo para organizar suas financas!",
        example:
          "Se voce recebe R$100 de mesada (receita) e gasta R$80 com lanche e jogos (despesas), sobram R$20. Esse e o seu saldo!",
        questions: [
          {
            id: 1,
            type: "multiple_choice",
            question:
              "Joao recebe R$150 de mesada e gasta R$120. Qual e o saldo dele?",
            options: ["R$120", "R$150", "R$30", "R$270"],
            answer: "R$30",
            explanation:
              "Saldo = Receita - Despesa. R$150 - R$120 = R$30. Joao tem um saldo positivo!",
          },
          {
            id: 2,
            type: "true_false",
            question: "Mesada e um exemplo de despesa.",
            options: ["Verdadeiro", "Falso"],
            answer: "Falso",
            explanation:
              "Mesada e uma receita, pois e dinheiro que ENTRA. Despesa e dinheiro que SAI.",
          },
          {
            id: 3,
            type: "fill_blank",
            question:
              "Complete: Quando suas despesas sao maiores que suas receitas, seu saldo e ___.",
            options: ["positivo", "negativo", "zero", "infinito"],
            answer: "negativo",
            explanation:
              "Quando voce gasta mais do que ganha, fica com saldo negativo - ou seja, no vermelho!",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Poupanca e Objetivos",
    description: "Descubra como guardar dinheiro e alcancar seus sonhos",
    icon: "piggy-bank",
    color: "#FF9600",
    lessons: [
      {
        id: 1,
        title: "Por que poupar?",
        content:
          "Poupar significa guardar parte do dinheiro que voce recebe para usar no futuro. E como plantar uma semente que vai virar uma arvore! Quem poupa tem mais seguranca e pode realizar sonhos maiores.",
        example:
          "Se voce quer comprar um videogame de R$500 e sua mesada e R$200, guardando R$100 por mes voce consegue em 5 meses!",
        questions: [
          {
            id: 1,
            type: "multiple_choice",
            question: "Qual e o principal beneficio de poupar dinheiro?",
            options: [
              "Ficar rico da noite pro dia",
              "Ter seguranca financeira e realizar objetivos",
              "Nao precisar trabalhar nunca mais",
              "Impressionar os amigos",
            ],
            answer: "Ter seguranca financeira e realizar objetivos",
            explanation:
              "Poupar traz seguranca para emergencias e permite alcalcar objetivos maiores ao longo do tempo.",
          },
          {
            id: 2,
            type: "multiple_choice",
            question:
              "Maria quer comprar um celular de R$1.200. Ela economiza R$200 por mes. Em quantos meses ela consegue?",
            options: ["4 meses", "6 meses", "8 meses", "12 meses"],
            answer: "6 meses",
            explanation:
              "R$1.200 / R$200 = 6 meses. Definir um objetivo e poupar regularmente e a chave!",
          },
          {
            id: 3,
            type: "true_false",
            question:
              "E melhor gastar todo o dinheiro assim que receber do que guardar uma parte.",
            options: ["Verdadeiro", "Falso"],
            answer: "Falso",
            explanation:
              "O ideal e sempre guardar uma parte do que recebe. A regra 50-30-20 sugere guardar pelo menos 20%!",
          },
        ],
      },
      {
        id: 2,
        title: "A regra 50-30-20",
        content:
          "Uma forma simples de organizar seu dinheiro: 50% para necessidades (comida, transporte), 30% para desejos (lazer, jogos) e 20% para poupanca e investimentos. Essa regra funciona para qualquer valor!",
        example:
          "Com uma mesada de R$200: R$100 para necessidades, R$60 para diversao e R$40 guardados. Simples assim!",
        questions: [
          {
            id: 1,
            type: "multiple_choice",
            question:
              "Na regra 50-30-20, quanto deve ir para poupanca e investimentos?",
            options: ["50%", "30%", "20%", "10%"],
            answer: "20%",
            explanation:
              "Na regra 50-30-20, 20% do que voce ganha deve ser guardado para poupanca e investimentos.",
          },
          {
            id: 2,
            type: "fill_blank",
            question:
              "Se Pedro ganha R$500, pela regra 50-30-20 ele deve guardar R$___.",
            options: ["50", "100", "150", "200"],
            answer: "100",
            explanation:
              "20% de R$500 = R$100. Esse valor deve ir para poupanca ou investimentos.",
          },
          {
            id: 3,
            type: "multiple_choice",
            question:
              "Qual categoria representa a MAIOR parte do orcamento na regra 50-30-20?",
            options: [
              "Desejos",
              "Poupanca",
              "Necessidades",
              "Investimentos",
            ],
            answer: "Necessidades",
            explanation:
              "50% vai para necessidades (comida, moradia, transporte) - a maior fatia do orcamento.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Juros Compostos",
    description: "A forca mais poderosa do universo financeiro",
    icon: "trending-up",
    color: "#CE82FF",
    lessons: [
      {
        id: 1,
        title: "O poder dos juros compostos",
        content:
          "Juros compostos sao juros sobre juros. Quando voce investe dinheiro, ganha juros. No proximo periodo, os juros sao calculados sobre o valor original MAIS os juros anteriores. E assim o dinheiro cresce cada vez mais rapido!",
        example:
          "Investindo R$1.000 a 10% ao ano: Ano 1: R$1.100 | Ano 2: R$1.210 | Ano 3: R$1.331. Veja como o crescimento acelera!",
        questions: [
          {
            id: 1,
            type: "multiple_choice",
            question: "O que sao juros compostos?",
            options: [
              "Juros calculados so sobre o valor inicial",
              "Juros sobre juros - calculados sobre o total acumulado",
              "Uma taxa fixa que nunca muda",
              "Um imposto sobre investimentos",
            ],
            answer:
              "Juros sobre juros - calculados sobre o total acumulado",
            explanation:
              "Juros compostos incidem sobre o valor total (principal + juros anteriores), fazendo o dinheiro crescer exponencialmente.",
          },
          {
            id: 2,
            type: "multiple_choice",
            question:
              "Se voce investe R$1.000 a 10% de juros compostos ao ano, quanto tera apos 2 anos?",
            options: ["R$1.100", "R$1.200", "R$1.210", "R$1.300"],
            answer: "R$1.210",
            explanation:
              "Ano 1: R$1.000 + 10% = R$1.100. Ano 2: R$1.100 + 10% = R$1.210. Os juros incidem sobre R$1.100, nao sobre R$1.000!",
          },
          {
            id: 3,
            type: "true_false",
            question:
              "Albert Einstein chamou os juros compostos de 'a oitava maravilha do mundo'.",
            options: ["Verdadeiro", "Falso"],
            answer: "Verdadeiro",
            explanation:
              "Essa frase e atribuida a Einstein e ilustra o poder extraordinario dos juros compostos ao longo do tempo.",
          },
        ],
      },
      {
        id: 2,
        title: "Tempo e seu melhor aliado",
        content:
          "Quanto mais cedo voce comeca a investir, mais tempo os juros compostos trabalham para voce. Comecar aos 15 anos e MUITO melhor do que comecar aos 30, mesmo investindo menos por mes!",
        example:
          "Ana investe R$100/mes dos 15 aos 65 anos (50 anos). Bruno investe R$200/mes dos 30 aos 65 (35 anos). Mesmo investindo o dobro, Bruno tera MENOS dinheiro que Ana por causa do tempo!",
        questions: [
          {
            id: 1,
            type: "multiple_choice",
            question:
              "Por que comecar a investir cedo e tao importante?",
            options: [
              "Porque voce ganha mais dinheiro de mesada quando jovem",
              "Porque os juros compostos tem mais tempo para multiplicar seu dinheiro",
              "Porque os bancos dao taxas melhores para jovens",
              "Nao e importante, tanto faz a idade",
            ],
            answer:
              "Porque os juros compostos tem mais tempo para multiplicar seu dinheiro",
            explanation:
              "O tempo e o ingrediente secreto dos juros compostos. Mais tempo = mais ciclos de juros sobre juros!",
          },
          {
            id: 2,
            type: "true_false",
            question:
              "Investir R$50 por mes dos 15 anos pode gerar mais dinheiro do que investir R$200 por mes a partir dos 40.",
            options: ["Verdadeiro", "Falso"],
            answer: "Verdadeiro",
            explanation:
              "Sim! O poder do tempo nos juros compostos pode superar ate valores maiores investidos mais tarde.",
          },
          {
            id: 3,
            type: "fill_blank",
            question:
              "O fator mais importante para os juros compostos funcionarem bem e o ___.",
            options: ["valor", "tempo", "banco", "risco"],
            answer: "tempo",
            explanation:
              "O tempo e o fator mais poderoso dos juros compostos. Quanto mais tempo, maior o efeito multiplicador!",
          },
        ],
      },
    ],
  },
];

export function getPhase(id: number) {
  return phases.find((p) => p.id === id);
}

export function getLesson(phaseId: number, lessonId: number) {
  const phase = getPhase(phaseId);
  return phase?.lessons.find((l) => l.id === lessonId);
}
