import { filterbyType as filterUsers } from '../components/Pages/Users';
import { filterbyType as filterOrganizations } from '../components/Pages/Organization';

describe('filterbyType function', () => {
  const mockData = [
    { id: 1, type: 'User', name: 'Alice' },
    { id: 2, type: 'Organization', name: 'Org1' },
    { id: 3, type: 'User', name: 'Bob' },
    { id: 4, type: 'Organization', name: 'Org2' },
    { id: 5, type: 'User', name: 'Charlie' },
    { id: 6, type: 'Repo', name: 'Charlie' },
    { id: 7, type: 'Code', name: 'Charlie' }

  ];

  test('Debe filtrar solo los usuarios con tipo User', () => {
    const result = filterUsers(mockData);
    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { id: 1, type: 'User', name: 'Alice' },
      { id: 3, type: 'User', name: 'Bob' },
      { id: 5, type: 'User', name: 'Charlie' }
    ]);
  });

  test('Debe filtrar solo las organizaciones con tipo Organization', () => {
    const result = filterOrganizations(mockData);
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: 2, type: 'Organization', name: 'Org1' },
      { id: 4, type: 'Organization', name: 'Org2' }
    ]);
  });

  test('Debe retornar un array vacío si no hay elementos del tipo especificado en el filtro de User', () => {
    const result = filterUsers([{ id: 6, type: 'Other', name: 'Unknown' }]);
    expect(result).toHaveLength(0);
  });

  test('Debe retornar un array vacío si no hay elementos del tipo especificado en el filtro de Organization', () => {
    const result = filterOrganizations([{ id: 6, type: 'Other', name: 'Unknown' }]);
    expect(result).toHaveLength(0);
  });

  test('Debe retornar un array vacío si se pasa un array vacío en el filtro de User', () => {
    const result = filterUsers([]);
    expect(result).toHaveLength(0);
  });

  test('Debe retornar un array vacío si se pasa un array vacío en el filtro de Organization', () => {
    const result = filterOrganizations([]);
    expect(result).toHaveLength(0);
  });

  test('Debe retornar un array vacío si se pasa un array que tenga objetos sin el atributo type en el filtro de Organization', () => {
    const result = filterOrganizations([{ id: 6, name: 'Unknown' }]);
    expect(result).toHaveLength(0);
  });

  test('Debe retornar un array vacío si se pasa un array que tenga objetos sin el atributo type en el filtro de User', () => {
    const result = filterUsers([{ id: 6, name: 'Unknown'}]);
    expect(result).toHaveLength(0);
  });

  test('Debe retornar un array vacío si se pasa un array que no tenga objetos en el filtro de User', () => {
    const result = filterUsers([1, 2, 3, 4, 5]);
    expect(result).toHaveLength(0);
  });

  test('Debe retornar un array vacío si se pasa un array que no tenga objetos en el filtro de Organization', () => {
    const result = filterOrganizations([1, 2, 3, 4, 5]);
    expect(result).toHaveLength(0);
  });
});
