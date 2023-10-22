const request = require("supertest");
const app = require("../index");
const { User, Photo, sequelize } = require("../models");
const { generateToken } = require("../helpers/jwt");

// data being used
const dataUser = [
  {
    username: "admin",
    email: "admin@mail.com",
    password: "terlanjurAdmin",
  },
  {
    username: "admin2",
    email: "admin2@mail.com",
    password: "terlanjurAdmin2",
    },
]

let token;

const dataFoto = [
  {
    title: "foto user 1",
    caption: "caption foto user 1",
    image_url: "foto 1",
    UserId: -1,
  },
  {
    title: "foto user 2",
    caption: "caption foto user 2",
    image_url: "foto 2",
    UserId: -1, //hasnt been assigned
  }
]

// helpers functions
const makeNewUser = async (dataUser, idx) => {
  try {
    await User.create(dataUser)
      .then((data) => {
        let payload = {
          id: data.id,
          email: data.email,
          username: data.username,
        }
        token = generateToken(payload);
        dataFoto[idx].UserId = data.id;
        // console.log(data);
        //update token dan UserId
        return token;
      })
  } catch (e) {
    console.log(e);
    return false;
  }
}

const removeUsers = async () => {
  try {
    await User.destroy({
      where: {}
    })
  } catch (e) {
    console.log(e);
  }
  return;
}

const createPhotos = async (dataFoto) => {
  try{
    await Photo.create(dataFoto[0]);
    await Photo.create(dataFoto[1]);
  } catch (e){
    console.log(e);
  }
  return;
}

const removePhotos = async () => {
  try{
    await Photo.destroy({ where: {} });
  } catch (e){
    console.log(e);
  }
}

// 1. API Create Photo
describe("POST /photos", () => {
  beforeAll( async() => {
    await makeNewUser(dataUser[1],1);
    await makeNewUser(dataUser[0],0)
      .then(async () => {
        if (!token){
          throw "Database Error";
        }
        await createPhotos(dataFoto);
      })
  });
  it("Respons sukses. Should be response 201", (done) => {
    request(app)
    .post("/photos")
    .set("authorization", token)
    .send(dataFoto[0])
    .expect(201)
    .end((e, res) => {
      if (e) done(e);

      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Created New Photo");
      expect(res.body).toHaveProperty("data");
      const data = res.body.data;
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("title");
      expect(data).toHaveProperty("caption");
      expect(data).toHaveProperty("image_url");
      expect(data).toHaveProperty("UserId");
      expect(data.title).toEqual(dataFoto[0].title);
      expect(data.caption).toEqual(dataFoto[0].caption);
      expect(data.image_url).toEqual(dataFoto[0].image_url);
      expect(data.UserId).toEqual(dataFoto[0].UserId);
      done();
    })
  })

  it("Respons error karena tidak menyatakan autentikasi. Should be response 401", (done) => {
    request(app)
      .post("/photos")
      .expect(401)
      .end((e, res) => {
        if (e) done(e);

        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Token not provided");
        done();
      })
  });

  afterAll(async () => {
    await removeUsers();
    await removePhotos();
  });
})

// 2. API Get All Photos
describe("GET /photos", () => {
  beforeAll( async() => {
    await makeNewUser(dataUser[1],1);
    await makeNewUser(dataUser[0],0)
      .then(async () => {
        if (!token){
          throw "Database Error";
        }
        await createPhotos(dataFoto);
      })
  });

  it("Respons sukses. Should be response 200", (done) => {
    request(app)
      .get("/photos")
      .set('authorization', token)
      .expect(200)
      .end((e, res) => {
        if (e) done(e);
        const firstPhoto = res.body[0];
        expect(res.body).toHaveLength(2);
        expect(firstPhoto).toHaveProperty("id");
        expect(firstPhoto).toHaveProperty("title");
        expect(firstPhoto).toHaveProperty("caption");
        expect(firstPhoto).toHaveProperty("image_url");
        expect(firstPhoto).toHaveProperty("UserId");
        done();
      })
  })
  it("Respons error karena tidak menyatakan autentikasi. Should be response 401", (done) => {
    request(app)
      .get("/photos")
      .expect(401)
      .end((e, res) => {
        if (e) done(e);

        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Token not provided");
        done();
      })
  });
  
  
  afterAll(async () => {
    await removeUsers();
    await removePhotos();
  });
});

// 3 API Get Photo By ID
describe("GET /photos/:id", () => {
  let userId, requestedPhotoId, wrongPhotoId;
  beforeAll( async() => {
    await makeNewUser(dataUser[1],1);
    await makeNewUser(dataUser[0],0)
      .then(async () => {
        if (!token){
          throw "Database Error";
        }
        await createPhotos(dataFoto)
          .then(async () => {
            await Photo.findOne({
              where: {
                "title": "foto user 1"
              }
            })
              .then((data) => {
                // console.log("requestedPhotoId", data);
                requestedPhotoId = data.dataValues.id;
                wrongPhotoId = Number(requestedPhotoId) + 100;
              });
    
            await User.findOne({
              where: {
                "email": dataUser[0].email
              }
            })
              .then((data) => {
                // console.log("requested user id",data);
                userId = data.dataValues.id;
              });
          })
      })
  });

  it("Respons sukses. Should be response 200", (done) => {
    request(app)
      .get(`/photos/${requestedPhotoId}`)
      .set('authorization', token)
      .send({
        userData: {
          id: userId
        }
      })
      .expect(200)
      .end((e, res) => {
        if (e) done(e);
        const data = res.body;
        expect(data).toHaveProperty("id");
        expect(data).toHaveProperty("title");
        expect(data).toHaveProperty("caption");
        expect(data).toHaveProperty("image_url");
        expect(data).toHaveProperty("UserId");
        expect(data.title).toEqual(dataFoto[0].title);
        expect(data.caption).toEqual(dataFoto[0].caption);
        expect(data.image_url).toEqual(dataFoto[0].image_url);
        expect(data.UserId).toEqual(dataFoto[0].UserId);
        done();
      })
  })

  it("Respons error karena tidak menyatakan autentikasi. Should be response 401", (done) => {
    request(app)
      .get(`/photos/${requestedPhotoId}`)
      .expect(401)
      .end((e, res) => {
        if (e) done(e);

        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Token not provided");
        done();
      })
  });

  it("Respons error data not found. Should be response 404", (done) => {
    request(app)
      .get(`/photos/${wrongPhotoId}`)
      .set('authorization', token)
      .expect(404)
      .end((e, res) => {
        if (e) done(e);

        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Data Not Found");
        done();
      })
  });
  
  afterAll(async () => {
    await removeUsers();
    await removePhotos();
  });
});