import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ClienteForm from './ClienteForm';
import { createCliente } from '../api'; // Importe a função que estamos mockando

// Mock da função createCliente
jest.mock('../api', () => ({
  createCliente: jest.fn().mockResolvedValue({}),
}));

describe('ClienteForm', () => {
  const mockOnClienteCreated = jest.fn();

  beforeEach(() => {
    render(<ClienteForm onClienteCreated={mockOnClienteCreated} />);
  });

  test('deve renderizar o formulário corretamente', () => {
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  test('deve exibir mensagens de erro para campos obrigatórios', async () => {
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/cpf é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/telefone é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/status é obrigatório/i)).toBeInTheDocument();
    });
  });

  test('deve chamar onClienteCreated ao submeter o formulário com dados válidos', async () => {
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'João' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'joao@example.com' } });
    fireEvent.change(screen.getByLabelText(/cpf/i), { target: { value: '12345678909' } });
    fireEvent.change(screen.getByLabelText(/telefone/i), { target: { value: '11987654321' } });
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'ativo' } });

    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(mockOnClienteCreated).toHaveBeenCalled();
    });
  });
});
