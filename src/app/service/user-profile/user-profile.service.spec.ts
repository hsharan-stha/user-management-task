import { TestBed } from '@angular/core/testing';

import { UserProfileService } from './user-profile.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UserProfile} from "@/app/interface/UserProfile";
import {environment} from "@/environments/environment";

describe('UserProfileService', () => {
  let service: UserProfileService;
  let httpMock:HttpTestingController;


  const mockUserProfiles:UserProfile[]=[
    {id:1,first_name:"Ram",last_name:"Shrestha",username:"rstha",isAdmin:true,department:"Marketing"},
    {id:2,first_name:"Ram",last_name:"Shrestha",username:"rstha",isAdmin:true,department:"Marketing"},
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[UserProfileService]
    });
    service = TestBed.inject(UserProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all user profiles', () => {
    service.findAll().subscribe(userProfiles => {
      expect(userProfiles.length).toBe(2);
      expect(userProfiles).toEqual(mockUserProfiles);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}user`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserProfiles);
  });

  it('should retrieve paginated user profiles', () => {
    service.findPaginatedAll(1, 1).subscribe(userProfiles => {
      expect(userProfiles.length).toBe(1);
      expect(userProfiles[0].first_name).toBe('John');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}user`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserProfiles);
  });

  it('should retrieve filtered and paginated user profiles', () => {
    const search = { key: 'first_name', value: 'Jane' };

    service.findPaginatedAll(1, 1, search).subscribe(userProfiles => {
      expect(userProfiles.length).toBe(1);
      expect(userProfiles[0].first_name).toBe('Jane');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}user`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserProfiles);
  });

  it('should save a new user profile', () => {
    const newUserProfile: UserProfile = {
      id: 3, first_name: 'Mike', last_name: 'Ross', username: 'mikeross', isAdmin: false, department: 'IT'
    };

    service.save(newUserProfile).subscribe(savedUserProfile => {
      expect(savedUserProfile).toEqual(newUserProfile);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}user`);
    expect(req.request.method).toBe('POST');
    req.flush(newUserProfile);
  });

  it('should retrieve a user profile by ID', () => {
    service.getById(1).subscribe(userProfile => {
      expect(userProfile).toEqual(mockUserProfiles[0]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}user/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserProfiles[0]);
  });

});
