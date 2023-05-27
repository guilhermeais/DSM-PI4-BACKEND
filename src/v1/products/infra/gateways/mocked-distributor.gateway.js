import { DistributorGateway } from '../../domain/protocols/gateways/distributor.gateway'

export class MockedDistributorGateway extends DistributorGateway {
  async getKwmDistributorPrice() {
    return 0.9
  }
}
