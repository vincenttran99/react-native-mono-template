export default {
  getVersion: jest.fn(() => "1.0.0"),
  getSystemName: jest.fn(() => "mockSystem"),
  isEmulator: jest.fn(() => false),
  getDeviceType: jest.fn(() => "Handset"),
};
