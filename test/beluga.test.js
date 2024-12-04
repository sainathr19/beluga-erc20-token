const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Beluga", function(){
    let beluga;
    let owner;
    let user;

    beforeEach(async()=>{
        [owner,user] = await ethers.getSigners();
        beluga = await ethers.deployContract("Beluga",["Beluga","BLG",6,5000]);
    })

    it("Should have correct Initial Values", async()=>{
        expect(await beluga.name()).to.equal("Beluga");
        expect(await beluga.symbol()).to.equal("BLG");
        expect(await beluga.decimals()).to.equal(6);
        expect(await beluga.totalSupply()).to.equal(5000);
    })

    it("Should have correct balance for owner", async()=>{
        expect(await beluga.balanceOf(owner.address)).to.equal(5000);
    })

    it("Should transfer tokens between accounts", async()=>{
        await beluga.connect(owner).transfer(user.address,1000);
        expect(await beluga.balanceOf(owner.address)).to.equal(4000);
        expect(await beluga.balanceOf(user.address)).to.equal(1000);
    })

    it("Should approve allowance for other accounts", async()=>{
        await beluga.connect(owner).approve(user.address,2000);
        expect(await beluga.allowance(owner.address,user.address)).to.equal(2000);
    })  

    it("Should transfer tokens from one account to another", async()=>{
        await beluga.connect(owner).approve(user.address,2000);
        await beluga.connect(user).transferFrom(owner.address,user.address,1000);
        expect(await beluga.balanceOf(user.address)).to.equal(1000);
        expect(await beluga.balanceOf(owner.address)).to.equal(4000);
    }) 

    it("Should burn tokens", async()=>{
        await beluga.connect(owner).burn(1000);
        expect(await beluga.totalSupply()).to.equal(4000);
        expect(await beluga.balanceOf(owner.address)).to.equal(4000);
    })

    it("Should revert if the sender is not the owner", async()=>{
        await expect(beluga.connect(user).mint(user.address,1000)).to.be.reverted;
    })

    it("Should revert if the allowance is exceeded", async()=>{
        await beluga.connect(owner).approve(user.address,2000);
        await expect(beluga.connect(user).transferFrom(owner.address,user.address,3000)).to.be.reverted;
    })

    it("Should revert if the balance is insufficient", async()=>{
        await expect(beluga.connect(user).transfer(owner.address,6000)).to.be.reverted;
    })

    it("Should revert if the allowance is insufficient", async()=>{
        await beluga.connect(owner).approve(user.address,2000);
        await expect(beluga.connect(user).transferFrom(owner.address,user.address,3000)).to.be.reverted;
    })  
})          