
export class TestReporter {
  private results: Array<{
    testId: string
    description: string
    status: 'passed' | 'failed' | 'skipped'
    duration: number
    error?: string
  }> = []
  
  addResult(testId: string, description: string, status: 'passed' | 'failed' | 'skipped', duration: number, error?: string) {
    this.results.push({
      testId,
      description,
      status,
      duration,
      error
    })
  }
  
  generateReport(): string {
    const total = this.results.length
    const passed = this.results.filter(r => r.status === 'passed').length
    const failed = this.results.filter(r => r.status === 'failed').length
    const skipped = this.results.filter(r => r.status === 'skipped').length
    
    let report = `
RELATÓRIO DE TESTES - GARIMPO
===============================

RESUMO:
- Total de Testes: ${total}
- Aprovados: ${passed}
- Falharam: ${failed}
- Ignorados: ${skipped}
- Taxa de Sucesso: ${((passed / total) * 100).toFixed(2)}%

DETALHES POR TESTE:
`
    
    this.results.forEach(result => {
      report += `
${result.testId} - ${result.description}
Status: ${result.status.toUpperCase()}
Duração: ${result.duration}ms
${result.error ? `Erro: ${result.error}` : ''}
---
`
    })
    
    return report
  }
}

export const reporter = new TestReporter()
