const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");

describe("GET /apps endpoint", () => {
    it('should return 400 if sort query is invalid', () => {
        return supertest(app)
            .get("/apps")
            .query({ sort: "Size" })
            .expect(400, { message: 'Sort must be one of app or rating' });
    });

    it('should return 400 if genre query is invalid', () => {
        return supertest(app)
            .get("/apps")
            .query({ genres: "NOPE" })
            .expect(400, { message: 'Genre must be included' });
    });

    it('display ratings in order', () => {
        return supertest(app)
            .get("/apps")
            .query({ sort: "rating" })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                console.log(res.body);
                expect(res.body).to.be.an('array');
                let i = 0, isSorted = true;
                while (isSorted && i < res.body.length - 1) {
                    isSorted = res.body[i].rating < res.body[i + 1].rating;
                    i++;
                }
                expect(isSorted).to.be.false;
            })
    })

    it('display app in order', () => {
        return supertest(app)
            .get("/apps")
            .query({ sort: "app" })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let i = 0, isSorted = true;
                while (isSorted && i < res.body.length - 1) {
                    isSorted = res.body[i].app < res.body[i + 1].app;
                    i++;
                }
                expect(isSorted).to.be.false;
            });
    });

    it('filters genre by given paramter value', () => {
        return supertest(app)
            .get("/apps")
            .query({ genres: "action" })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                for(let i = 0; i < res.body.length; i++ ){
                    let filter = true;
                    if(res.body[i].genres !== "action" ){
                        return filter = false;
                    }
                    else {
                        return filter = true;
                    }
                }
                expect(filter).to.be.true;
            });
    });
});
