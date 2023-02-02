import mongoose from 'mongoose';

export const GatewaySchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  ipv4Address: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        const pattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        return pattern.test(value);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid IPv4 address!`,
    },
  },
  devices: [
    {
      uid: {
        type: String,
        required: true,
        unique: true,
      },
      vendor: {
        type: String,
        required: true,
      },
      dateCreated: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        required: true,
        enum: ['online', 'offline'],
      },
    },
  ],
});

export const Gateway = mongoose.model('Gateway', GatewaySchema);
