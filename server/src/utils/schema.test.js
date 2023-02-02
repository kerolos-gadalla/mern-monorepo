import { Gateway } from './schema';

describe('Gateway', () => {
  it('should be invalid if serialNumber is empty', () => {
    const gateway = new Gateway();
    expect(gateway.validateSync().errors.serialNumber).toBeDefined();
  });

  it('should be invalid if name is empty', () => {
    const gateway = new Gateway();
    expect(gateway.validateSync().errors.name).toBeDefined();
  });

  it('should be invalid if ipv4Address is empty', () => {
    const gateway = new Gateway();
    expect(gateway.validateSync().errors.ipv4Address).toBeDefined();
  });

  it('should be valid if all fields are provided', () => {
    const gateway = new Gateway({
      serialNumber: '7890',
      name: 'Home Gateway',
      ipv4Address: '192.168.1.1',
      devices: [
        {
          uid: 12345,
          vendor: 'Apple',
          dateCreated: new Date(),
          status: 'online',
        },
      ],
    });
    expect(gateway.validateSync()).toBeUndefined();
  });
});
