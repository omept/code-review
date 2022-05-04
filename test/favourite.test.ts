/* eslint-disable no-undef */
import request from "supertest";
import { server } from "../src/api";
import { Favorite } from "../src/models/Favorite";

describe("test favorite routes", () => {
  beforeEach(() => {
    jest.mock("../src/models/Favorite.ts");
  });
  const profileId = "6583948348755834j34384934m345";

  const favourite = {
    favorite: [
      {
        profileId,
        name: "john doe",
        favorite1: "some favorite",
        favorite2: "some favorite 2",
        favorite3: "some favorite 3"
      },
      {
        profileId: "fake profile id",
        name: "john doe",
        favorite1: "some favorite",
        favorite2: "some favorite 2",
        favorite3: "some favorite 3"
      }
    ]
  };

  test("Should have favorite key record", async () => {
    const favFind = {
      limit: jest.fn(() => favFind),
      lean: jest.fn(():any => favourite)
    };
    const mockGetFavourites = jest.fn((): any => favFind);

    jest
      .spyOn(Favorite, "find")
      .mockImplementation(() => mockGetFavourites());

    const res = await request(server).get("/api/favorite");

    expect(mockGetFavourites).toHaveBeenCalledTimes(1);
    expect(mockGetFavourites().limit).toHaveBeenCalledTimes(1);
    expect(mockGetFavourites().lean).toHaveBeenCalledTimes(1);
    expect(res.body).toHaveProperty("favorite");
  });

  test(`Should return the favorite with ${profileId}`, async () => {
    const filteredFavByProfileId = favourite.favorite.filter((e:any) => e.profileId === profileId);
    const favFind = {
      limit: jest.fn(() => favFind),
      lean: jest.fn(():any => filteredFavByProfileId)
    };
    const mockGetFavourites = jest.fn((): any => favFind);

    jest
      .spyOn(Favorite, "find")
      .mockImplementation(() => mockGetFavourites());

    const res = await request(server).get(`/api/favorite/${profileId}`);

    expect(mockGetFavourites).toHaveBeenCalledTimes(1);
    expect(mockGetFavourites().lean).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual(filteredFavByProfileId);
  });
});
