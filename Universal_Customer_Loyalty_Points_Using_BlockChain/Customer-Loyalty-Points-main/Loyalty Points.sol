 //SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
contract Loyaltypoints
{
      address companyD;
      constructor(){
          companyD=msg.sender;
      }


    struct company{
        string companyname;
        uint companyaccount;
        uint productid;
        uint productcost;
        string productname;
        uint productrating;   
        uint companyid;
    }


    struct customer{
        address customername;
        uint customerid;
        uint customeraccount;
        uint customerphonenumber;
        uint loyaltypoints;
}

company[] pro_length;


mapping(string=>company)public comp;
mapping(address=>customer)public cust;
function setcompanydetails(string memory _companyname,uint _companyaccount,uint _productid,uint _productcost,
string memory _productname,uint _productrating,uint _companyid)public{
    comp[_companyname]=company(_companyname,_companyaccount,_productid,_productcost
    ,_productname,_productrating,_companyid);
    pro_length.push(company(_companyname,_companyaccount,_productid,_productcost
    ,_productname,_productrating,_companyid));

}

function T_Length() public view returns(uint){
    return pro_length.length;
}

function setcustomerdetails(address _customername,  uint _customerid,uint _customeraccount,uint _customerphonenumber,
uint _loyaltypoints )public{
    cust[_customername]=customer(_customername,_customerid,_customeraccount,_customerphonenumber,_loyaltypoints);
}



function getProductDetails()external view returns(string[] memory,string[] memory,uint[] memory ){
    string[] memory _product=new string[](pro_length.length);
    string[] memory c_name=new string[](pro_length.length);
    uint[] memory _costt=new uint[](pro_length.length);

    for(uint i=0;i<pro_length.length;i++){
     c_name[i]=pro_length[i].companyname;
        _product[i]=pro_length[i].productname;
        _costt[i]=pro_length[i].productcost;
        
    }

    return(c_name,_product,_costt);
} 


function buy(string memory pro_company,string memory pro_namee)public  returns(string memory){
    string memory message;
     for(uint i=0;i<pro_length.length;i++){

         require(keccak256(abi.encodePacked((comp[pro_company].companyname)))==keccak256(abi.encodePacked((pro_company))));

         if(keccak256(abi.encodePacked((comp[pro_company].companyname)))==keccak256(abi.encodePacked((pro_company)))){
             require(keccak256(abi.encodePacked((comp[pro_company].productname)))==keccak256(abi.encodePacked((pro_namee))));

             if(keccak256(abi.encodePacked((comp[pro_company].companyname)))==keccak256(abi.encodePacked((pro_company)))){
    
    uint value = comp[pro_company].productcost;
    uint cid = cust[msg.sender].customeraccount;

    require(cid>=value);

    if(cid>=value){
    cust[msg.sender].customeraccount = cid-value;
    comp[pro_company].companyaccount +=value;
    uint loyaltypoints = (value/10);
    cust[msg.sender].loyaltypoints += loyaltypoints;
    message = "Transaction Successful";
    break;
    }


    else{
    message = "InSufficient Balance ";
    }
             }
         }
}

    return (message);
}
}
