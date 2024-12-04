async function main() {
    const Beluga = await ethers.getContractFactory("Beluga");
    const token = await Beluga.deploy("BELUGA", "BLGT", 0, 10000);
    await token.waitForDeployment();
    
    console.log("Token deployed to:", await token.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });