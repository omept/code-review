/* eslint-disable no-undef */
import request from "supertest";
import { server } from "../src/api";
import { Simulator } from "../src/models/Simulator";

describe("test simulator routes", () => {
  beforeEach(() => {
    jest.mock("../src/models/Simulator.ts");
  });
  const profileId = "62728110a940ff133370b033";
  const profileId2 = "41224d776a326fb40f000001";
  const simulators = {
    simulators: [
      {
        profileId,
        dateRecorded: "5/12/2020",
        cryptocurrency: "sample",
        euros: 3000,
        price: 120,
        quantity: 3
      },
      {
        profileId: "1232334h4gg34g23jj4jk34",
        dateRecorded: "6/10/2021",
        cryptocurrency: "maybe",
        euros: 5000,
        price: 100,
        quantity: 6
      }
    ]
  };

  test("/api/simulator returns a list of simulations", async () => {
    const profileFind = {
      find: jest.fn(() => profileFind),
      limit: jest.fn(() => profileFind),
      lean: jest.fn(():any => simulators)
    };
    const mockGetSimulator = jest.fn((): any => profileFind);

    jest
      .spyOn(Simulator, "find")
      .mockImplementation(() => mockGetSimulator());

    const res = await request(server).get("/api/simulator");

    expect(mockGetSimulator).toHaveBeenCalledTimes(1);
    expect(mockGetSimulator().limit).toHaveBeenCalledTimes(1);
    expect(mockGetSimulator().lean).toHaveBeenCalledTimes(1);
    expect(res.body).toHaveProperty("simulators");
  });

  test(`(get) /api/simulator/${profileId} returns a list of simulations that belongs to ${profileId}`, async () => {
    const filteredSimByProfileId = simulators.simulators.filter((e:any) => e.profileId === profileId);
    const profileFind = {
      find: jest.fn(() => profileFind),
      lean: jest.fn(():any => filteredSimByProfileId)
    };
    const mockGetSimulator = jest.fn((): any => profileFind);

    jest
      .spyOn(Simulator, "find")
      .mockImplementation(() => mockGetSimulator());

    const res = await request(server).get(`/api/simulator/${profileId}`);
    expect(res.status).toBe(200);
    expect(mockGetSimulator).toHaveBeenCalledTimes(1);
    expect(mockGetSimulator().lean).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual(filteredSimByProfileId);
  });

  test(`(post) /api/simulator/${profileId2} creates a simulation that belongs to ${profileId2}`, async () => {
    const mockSimulatorCreateData = {
      profileId: profileId2,
      dateRecorded: "9/04/2020",
      cryptocurrency: "dodge",
      euros: 5000,
      price: 10,
      quantity: 70
    };

    const mockGetSimulator = jest.fn((): any => mockSimulatorCreateData);

    jest
      .spyOn(Simulator, "create")
      .mockImplementation(() => mockGetSimulator());

    const res = await request(server).post(`/api/simulator/${profileId}`).send(mockSimulatorCreateData);
    expect(res.status).toBe(200);
    expect(mockGetSimulator).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual(mockSimulatorCreateData);
  });
});
