import { TestBed } from '@angular/core/testing';
import { UserPreferencesComponent } from './user-preferences.component';
import { StorageService } from '../../../services/storage.service';

describe('UserPreferencesComponent', () => {
  let component: UserPreferencesComponent;
  let storageServiceMock: jest.Mocked<StorageService>;

  beforeEach(() => {
    storageServiceMock = {
      getItem: jest.fn(),
      setItem: jest.fn()
    } as unknown as jest.Mocked<StorageService>;

    TestBed.configureTestingModule({
      imports: [UserPreferencesComponent],
      providers: [
        { provide: StorageService, useValue: storageServiceMock }
      ]
    });

    component = TestBed.createComponent(UserPreferencesComponent).componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });

  it('should initialize with default preferences when no saved preferences', () => {
    storageServiceMock.getItem.mockReturnValue(null);
    component.ngOnInit();

    // @ts-ignore
    expect(component.preferences.theme).toBe('dark');
    // @ts-ignore
    expect(component.preferences.language).toBe('french');
    // @ts-ignore
    expect(storageServiceMock.getItem).toHaveBeenCalledWith('user_preferences');
  });

  it('should load saved preferences from storage', () => {
    const savedPrefs = { theme: 'light', language: 'english' };
    storageServiceMock.getItem.mockReturnValue(savedPrefs);

    component.ngOnInit();

    // @ts-ignore
    expect(component.preferences.theme).toBe('light');
    // @ts-ignore
    expect(component.preferences.language).toBe('english');
  });

  it('should merge saved preferences with defaults', () => {
    const savedPrefs = { theme: 'light' };
    storageServiceMock.getItem.mockReturnValue(savedPrefs);

    component.ngOnInit();

    // @ts-ignore
    expect(component.preferences.theme).toBe('light');
    // @ts-ignore
    expect(component.preferences.language).toBe('french');
  });

  it('should update theme and preferences on switchingTheme', () => {
    component.switchingTheme('light');

    // @ts-ignore
    expect(component.preferences.theme).toBe('light');
  });

  it('should save preferences to storage service', () => {
    component.preferences = { theme: 'custom', language: 'italian' };
    component.savePreferences();

    // @ts-ignore
    expect(storageServiceMock.setItem).toHaveBeenCalledWith('user_preferences', { theme: 'custom', language: 'italian' });
  });
});
