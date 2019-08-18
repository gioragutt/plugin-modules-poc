import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { LazyFeature, LazyFeatureConfig, FEATURE_CONFIG, LAZY_FEATURES } from './config';
import { FeatureConfigLoaderService } from './feature-config-loader.service';
import { FeatureModuleLoaderService } from './feature-module-loader.service';
import { BootstrapperService } from './bootstrapper.service';

@NgModule()
export class LazyFeatureModule {
  static forFeature(config: LazyFeatureConfig): ModuleWithProviders {
    console.log('[LazyFeatureModule] forFeature(', config, ')');
    return {
      ngModule: LazyFeatureModule,
      providers: [
        {
          provide: FEATURE_CONFIG,
          useValue: config,
        } as Provider,
      ]
    };
  }

  static forRoot(features: LazyFeature[]): ModuleWithProviders {
    console.log('[LazyFeatureModule] forRoot(', features, ')');
    return {
      ngModule: LazyFeatureModule,
      providers: [
        FeatureConfigLoaderService,
        FeatureModuleLoaderService,
        BootstrapperService,
        { provide: LAZY_FEATURES, useValue: features },
      ]
    };
  }
}
