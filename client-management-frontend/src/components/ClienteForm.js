import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createCliente } from '../api';

const schema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  cpf: yup.string()
    .matches(/^\d{11}$/, 'CPF deve ter 11 dígitos')
    .required('CPF é obrigatório'),
  telefone: yup.string()
    .matches(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
    .required('Telefone é obrigatório'),
  status: yup.string().required('Status é obrigatório'),
});

const ClienteForm = ({ onClienteCreated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await createCliente(data);
    onClienteCreated(); // Atualiza a lista de clientes após criação
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Criar Cliente</h2>
      <div>
        <label>Nome:</label>
        <input {...register('nome')} />
        <p>{errors.nome?.message}</p>
      </div>
      <div>
        <label>Email:</label>
        <input type="email" {...register('email')} />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <label>CPF:</label>
        <input {...register('cpf')} />
        <p>{errors.cpf?.message}</p>
      </div>
      <div>
        <label>Telefone:</label>
        <input {...register('telefone')} />
        <p>{errors.telefone?.message}</p>
      </div>
      <div>
        <label>Status:</label>
        <select {...register('status')}>
          <option value="">Selecione</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
          <option value="aguardando efetivação">Aguardando Efetivação</option>
          <option value="desativado">Desativado</option>
        </select>
        <p>{errors.status?.message}</p>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default ClienteForm;
