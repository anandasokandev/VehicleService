export class SignUp{
    FullName: string;
    Email: string;
    Phone: string;
    UserName: string;
    Password: string; 
    Role: string; 
    LocationId: number;
    CenterName: string; 
    AddressLane1: string; 
    AddressLane2: string;

    constructor()
    {
        this.FullName = '',
        this.Email = '',
        this.Phone = '',
        this.UserName = '',
        this.Password = '',
        this.Role = '',
        this.LocationId = 0,
        this.CenterName = '',
        this.AddressLane1 = '',
        this.AddressLane2 = ''
    }
}