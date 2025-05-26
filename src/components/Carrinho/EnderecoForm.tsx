
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EnderecoData {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: string;
}

interface EnderecoFormProps {
  endereco: EnderecoData;
  onChange: (endereco: EnderecoData) => void;
}

export function EnderecoForm({ endereco, onChange }: EnderecoFormProps) {
  const handleChange = (field: keyof EnderecoData, value: string) => {
    onChange({ ...endereco, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-marrom-cafezinho">Endereço de Entrega</h3>
      
      <div>
        <Label htmlFor="rua" className="text-marrom-cafezinho font-medium">Rua</Label>
        <Input
          id="rua"
          value={endereco.rua}
          onChange={(e) => handleChange('rua', e.target.value)}
          required
          data-cy="endereco-rua"
          className="border-cinza-sujo/30 mt-1"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="numero" className="text-marrom-cafezinho font-medium">Número</Label>
          <Input
            id="numero"
            value={endereco.numero}
            onChange={(e) => handleChange('numero', e.target.value)}
            required
            data-cy="endereco-numero"
            className="border-cinza-sujo/30 mt-1"
          />
        </div>
        <div>
          <Label htmlFor="cep" className="text-marrom-cafezinho font-medium">CEP</Label>
          <Input
            id="cep"
            value={endereco.cep}
            onChange={(e) => handleChange('cep', e.target.value)}
            required
            data-cy="endereco-cep"
            className="border-cinza-sujo/30 mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="bairro" className="text-marrom-cafezinho font-medium">Bairro</Label>
        <Input
          id="bairro"
          value={endereco.bairro}
          onChange={(e) => handleChange('bairro', e.target.value)}
          required
          data-cy="endereco-bairro"
          className="border-cinza-sujo/30 mt-1"
        />
      </div>

      <div>
        <Label htmlFor="cidade" className="text-marrom-cafezinho font-medium">Cidade</Label>
        <Input
          id="cidade"
          value={endereco.cidade}
          onChange={(e) => handleChange('cidade', e.target.value)}
          required
          data-cy="endereco-cidade"
          className="border-cinza-sujo/30 mt-1"
        />
      </div>
    </div>
  );
}
