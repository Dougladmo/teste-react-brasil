
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DadosCartaoData {
  numero: string;
  nome: string;
  validade: string;
  cvv: string;
}

interface DadosCartaoFormProps {
  dadosCartao: DadosCartaoData;
  onChange: (dados: DadosCartaoData) => void;
  isVisible: boolean;
}

export function DadosCartaoForm({ dadosCartao, onChange, isVisible }: DadosCartaoFormProps) {
  const handleChange = (field: keyof DadosCartaoData, value: string) => {
    onChange({ ...dadosCartao, [field]: value });
  };

  if (!isVisible) return null;

  return (
    <div className="space-y-4 p-4 bg-bege-po/50 rounded-lg">
      <h4 className="font-medium text-marrom-cafezinho">Dados do Cartão</h4>
      <p className="text-sm text-marrom-cafezinho/70">Para testes, você pode usar qualquer número de cartão</p>
      
      <div>
        <Label htmlFor="numero-cartao" className="text-marrom-cafezinho font-medium">Número do Cartão</Label>        <Input
          id="numero-cartao"
          data-cy="numero-cartao"
          placeholder="1234 5678 9012 3456"
          value={dadosCartao.numero}
          onChange={(e) => handleChange('numero', e.target.value)}
          required
          className="border-cinza-sujo/30 mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="nome-cartao" className="text-marrom-cafezinho font-medium">Nome no Cartão</Label>        <Input
          id="nome-cartao"
          data-cy="nome-cartao"
          placeholder="Nome como no cartão"
          value={dadosCartao.nome}
          onChange={(e) => handleChange('nome', e.target.value)}
          required
          className="border-cinza-sujo/30 mt-1"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="validade" className="text-marrom-cafezinho font-medium">Validade</Label>          <Input
            id="validade"
            data-cy="validade"
            placeholder="MM/AA"
            value={dadosCartao.validade}
            onChange={(e) => handleChange('validade', e.target.value)}
            required
            className="border-cinza-sujo/30 mt-1"
          />
        </div>
        <div>
          <Label htmlFor="cvv" className="text-marrom-cafezinho font-medium">CVV</Label>          <Input
            id="cvv"
            data-cy="cvv"
            placeholder="123"
            value={dadosCartao.cvv}
            onChange={(e) => handleChange('cvv', e.target.value)}
            required
            className="border-cinza-sujo/30 mt-1"
          />
        </div>
      </div>
    </div>
  );
}
