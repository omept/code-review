/* eslint-disable no-undef */
import request from "supertest";
import { server } from "../../api";
import { Profile } from "../../models/Profile";

describe("test profile routes", () => {
  const name = "Sample Ekwe";
  const email = "test@admin.test";
  const nickname = "a nickname";
  const profile = {
    profile: [
      {
        name,
        nickname,
        email,
        capital: 100000,
        divisa: "sample",
        preferedCryptocurrency: "sample"
      },
      {
        name: "Ugwu Ekwe Emmanuel",
        nickname: "firs",
        email: "test2@admin.test",
        capital: 500000,
        divisa: "sample",
        preferedCryptocurrency: "sample"
      }
    ]
  };

  test("/api/profile returns a list of profiles", async () => {
    const profileFind = {
      limit: jest.fn(() => profileFind),
      lean: jest.fn(():any => profile)
    };
    const mockGetFavourites = jest.fn((): any => profileFind);

    jest
      .spyOn(Profile, "find")
      .mockImplementation(() => mockGetFavourites());

    const res = await request(server).get("/api/profile");

    expect(mockGetFavourites).toHaveBeenCalledTimes(1);
    expect(mockGetFavourites().limit).toHaveBeenCalledTimes(1);
    expect(mockGetFavourites().lean).toHaveBeenCalledTimes(1);
    expect(res.body).toHaveProperty("profile");
  });

  test(`(post) /api/profile returns the profile where name is "${name}" and email is "${email}"`, async () => {
    const mockMongooseProfileResp = profile.profile.filter((e:any) => e.name === name && e.email === email);
    const profileFind = {
      exec: jest.fn(():any => mockMongooseProfileResp)
    };
    const mockPostProfile = jest.fn((): any => profileFind);

    jest
      .spyOn(Profile, "findOne")
      .mockImplementation(() => mockPostProfile());

    const res = await request(server).post("/api/profile").send({ name, email });
    expect(mockPostProfile).toHaveBeenCalledTimes(1);
    expect(mockPostProfile().exec).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual(mockMongooseProfileResp);
  });

  test("(post) /api/profile returns a created profile where name and email are not found", async () => {
    const name2 = "unknown";
    const email2 = "unknown@sample.com";
    const mockMongooseProfileResp = {
      name: name2,
      email: email2,
      nickname
    };

    const profileFind = {
      exec: jest.fn(() => {})
    };

    const mockPostProfileExec = jest.fn((): any => profileFind);
    const mockPostProfileCreate = jest.fn((): any => mockMongooseProfileResp);

    jest
      .spyOn(Profile, "findOne")
      .mockImplementation(() => mockPostProfileExec());

    jest
      .spyOn(Profile, "create")
      .mockImplementation(() => mockPostProfileCreate());

    const res = await request(server).post("/api/profile").send({ name: name2, email: email2, nickname });

    expect(mockPostProfileExec).toHaveBeenCalledTimes(1);
    expect(mockPostProfileExec().exec).toHaveBeenCalledTimes(1);
    expect(mockPostProfileCreate).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual(mockMongooseProfileResp);
  });
});
