/**
 * Algoritmo de programação dinâmica para resolver o problema de troco de moedas.
 * 
 * Esse algoritmo calcula o número mínimo de moedas necessárias para formar um determinado valor, 
 * além de retornar a contagem de cada tipo de moeda usada.
 * 
 * @param coins - Um array de números inteiros representando os valores das moedas disponíveis.
 * @param value - O valor para o qual queremos calcular o troco.
 * 
 * @returns Um objeto que mapeia os valores das moedas para a quantidade de vezes que cada uma foi usada
 *          para formar o valor desejado. Se não for possível formar o valor, retorna um objeto vazio.
 */
export default function coinChange(coins: number[], value: number): Record<number, number> {
    // Array dp onde dp[i] representa o número mínimo de moedas necessárias para formar o valor i.
    const dp = new Array(value + 1).fill(Infinity);
    
    // Array usedCoins armazena qual moeda foi usada para formar o valor i.
    const usedCoins = new Array(value + 1).fill(-1);
  
    // Inicializamos dp[0] com 0, pois não precisamos de nenhuma moeda para formar o valor 0.
    dp[0] = 0; 
  
    // Laço para preencher o dp com o número mínimo de moedas necessárias para cada valor até o valor alvo.
    for (let i = 1; i <= value; i++) {
      // Verificamos cada moeda disponível.
      for (const coin of coins) {
        // Se for possível usar a moeda (i - coin >= 0) e o número de moedas para o valor i - coin + 1 for melhor
        // do que o número atual de moedas para o valor i, então atualizamos o dp[i].
        if (i - coin >= 0 && dp[i - coin] + 1 < dp[i]) {
          dp[i] = dp[i - coin] + 1;
          // Armazenamos qual moeda foi usada para formar o valor i.
          usedCoins[i] = coin;
        }
      }
    }
  
    // Se dp[value] ainda for Infinity, significa que não é possível formar o valor desejado com as moedas disponíveis.
    if (dp[value] === Infinity) {
      return {}; // Retorna um objeto vazio indicando que não é possível formar o valor.
    }
  
    // Objeto usado armazenará a contagem de cada moeda usada.
    const used: Record<number, number> = {};
  
    // Variável current vai de value até 0, reconstruindo as moedas usadas para formar o valor desejado.
    let current = value;
    while (current > 0 && usedCoins[current] !== -1) {
      // Identificamos qual moeda foi usada no valor current.
      const coin = usedCoins[current];
      // Atualizamos a quantidade de moedas usadas para o valor 'coin'.
      used[coin] = (used[coin] || 0) + 1;
      // Subtraímos o valor da moeda usada do valor corrente.
      current -= coin;
    }
  
    // Retorna o objeto com as contagens de cada moeda usada para formar o valor desejado.
    return used;
  }
  