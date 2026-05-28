export const androidFiles = [
  {
    name: "README.md",
    type: "markdown",
    content: `# Daily Article Mentor

## Clean Architecture Structure
\`\`\`text
com.dailymentor.app
├── core
│   ├── di/               # Hilt Modules (NetworkModule, AppModule)
│   ├── theme/            # Material 3 Theme components
│   └── util/             # Helpers, constants
├── data
│   ├── remote/           # Firebase, Retrofit APIs
│   ├── local/            # Room Database / DataStore
│   └── repository/       # Repository implementations
├── domain
│   ├── model/            # Core business models (Article, Preferences)
│   ├── repository/       # Repository interfaces
│   └── usecase/          # Business logic handlers
└── presentation
    ├── navigation/       # Compose Navigation (NavHost, Routes)
    ├── onboarding/       # Onboarding UI & ViewModel
    └── dashboard/        # Dashboard UI & ViewModel
\`\`\`

## Architecture Approach
We are using **Clean Architecture** combined with **MVVM**.
1. **Presentation Layer**: Jetpack Compose screens + Hilt ViewModels. They observe \`StateFlow\` exposed by ViewModels.
2. **Domain Layer**: Pure Kotlin. Contains UseCases (e.g., \`GetScheduledArticlesUseCase\`), repository interfaces, and Models.
3. **Data Layer**: Implements domain repositories. Handles switching between \`remote\` (Retrofit/Firebase) and \`local\` (Room) sources.
`
  },
  {
    name: "app/build.gradle.kts",
    type: "code",
    language: "kotlin",
    content: `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.google.dagger.hilt.android")
    id("com.google.devtools.ksp")
    id("com.google.gms.google-services")
}

android {
    namespace = "com.dailymentor.app"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.dailymentor.app"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }

    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.10"
    }
}

dependencies {
    // Core Android
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")
    implementation("androidx.activity:activity-compose:1.8.2")

    // Compose & UI
    implementation(platform("androidx.compose:compose-bom:2024.02.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.navigation:navigation-compose:2.7.7")
    
    // Hilt DI
    implementation("com.google.dagger:hilt-android:2.51")
    ksp("com.google.dagger:hilt-compiler:2.51")
    implementation("androidx.hilt:hilt-navigation-compose:1.2.0")
    
    // Retrofit (Network)
    implementation("com.squareup.retrofit2:retrofit:2.11.0")
    implementation("com.squareup.retrofit2:converter-gson:2.11.0")
    
    // Firebase
    implementation(platform("com.google.firebase:firebase-bom:32.7.4"))
    implementation("com.google.firebase:firebase-auth-ktx")
    implementation("com.google.firebase:firebase-firestore-ktx")
    
    // WorkManager (Notifications)
    implementation("androidx.work:work-runtime-ktx:2.9.0")
    implementation("androidx.hilt:hilt-work:1.2.0")
}`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/DailyMentorApp.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app

import android.app.Application
import dagger.hilt.android.HiltAndroidApp

/**
 * Top-level application class.
 * Marked with @HiltAndroidApp to trigger Hilt's code generation,
 * serving as the application-level dependency container.
 */
@HiltAndroidApp
class DailyMentorApp : Application() {
    override fun onCreate() {
        super.onCreate()
        
        // Initialize Firebase
        // Setup WorkManager scheduling for daily notifications
    }
}`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/MainActivity.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.dailymentor.app.core.theme.DailyMentorTheme
import com.dailymentor.app.presentation.navigation.AppNavigation
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            DailyMentorTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AppNavigation()
                }
            }
        }
    }
}`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/core/di/NetworkModule.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app.core.di

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    @Provides
    @Singleton
    fun provideRetrofit(): Retrofit {
        return Retrofit.Builder()
            .baseUrl("https://newsapi.org/v2/") // Placeholder for News API
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    @Provides
    @Singleton
    fun provideFirebaseAuth(): FirebaseAuth {
        return FirebaseAuth.getInstance()
    }

    @Provides
    @Singleton
    fun provideFirebaseFirestore(): FirebaseFirestore {
        return FirebaseFirestore.getInstance()
    }
}`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/domain/model/Article.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app.domain.model

data class Article(
    val id: String,
    val title: String,
    val originalContent: String,
    val aiSummary: String,
    val aiExplanation: String,
    val keywords: List<String>,
    val relevanceInfo: String,
    val isCompleted: Boolean = false
)`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/domain/repository/ArticleRepository.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app.domain.repository

import com.dailymentor.app.domain.model.Article
import kotlinx.coroutines.flow.Flow

interface ArticleRepository {
    /** Connects to local Datastore or Room Database layer to fetch articles scheduled for today */
    fun getTodayArticles(examType: String): Flow<List<Article>>
    
    /** Marks the article locally and syncs upstream to Firestore via Firebase APIs */
    suspend fun markArticleAsCompleted(articleId: String)
    
    /** Calls Retrofit to fetch news, routes it through Gemini API for extraction, then saves locally */
    suspend fun syncArticlesFromRemote()
}`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/presentation/navigation/AppNavigation.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app.presentation.navigation

import androidx.compose.runtime.Composable
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.dailymentor.app.presentation.dashboard.DashboardScreen
import com.dailymentor.app.presentation.onboarding.OnboardingScreen

@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    // Start destination will ultimately be reactive based on UserPreferences DataStore
    val startDestination = "onboarding"

    NavHost(navController = navController, startDestination = startDestination) {
        composable("onboarding") {
            // Using Hilt to inject ViewModel automatically
            OnboardingScreen(
                onFinished = {
                    navController.navigate("dashboard") {
                        popUpTo("onboarding") { inclusive = true }
                    }
                }
            )
        }
        
        composable("dashboard") {
            DashboardScreen(
                viewModel = hiltViewModel() // Hilt resolves dependencies automatically
            )
        }
    }
}`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/presentation/dashboard/DashboardViewModel.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app.presentation.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dailymentor.app.domain.repository.ArticleRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class DashboardViewModel @Inject constructor(
    private val articleRepository: ArticleRepository // Injected via Hilt NetworkModule -> RepositoryModule
) : ViewModel() {

    private val _uiState = MutableStateFlow(DashboardUiState())
    val uiState: StateFlow<DashboardUiState> = _uiState.asStateFlow()

    init {
        loadDashboardData()
    }

    private fun loadDashboardData() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            
            // Example of collecting flow properly via UseCase/Repository:
            // articleRepository.getTodayArticles("UPSC").collect { articles ->
            //    _uiState.value = _uiState.value.copy(articles = articles, isLoading = false)
            // }
            
            // Mock response
            _uiState.value = _uiState.value.copy(
                isLoading = false,
                completedToday = 2,
                targetToday = 5,
                streakCount = 12
            )
        }
    }

    fun onArticleCompleted(articleId: String) {
        viewModelScope.launch {
            articleRepository.markArticleAsCompleted(articleId)
        }
    }
}

data class DashboardUiState(
    val isLoading: Boolean = false,
    val completedToday: Int = 0,
    val targetToday: Int = 0,
    val streakCount: Int = 0
)`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/presentation/dashboard/DashboardScreen.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app.presentation.dashboard

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardScreen(viewModel: DashboardViewModel) {
    val uiState by viewModel.uiState.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Daily Mentor") })
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            if (uiState.isLoading) {
                CircularProgressIndicator()
            } else {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            "Today's Mission", 
                            style = MaterialTheme.typography.titleMedium
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        LinearProgressIndicator(
                            progress = { 
                                if (uiState.targetToday > 0) 
                                    uiState.completedToday.toFloat() / uiState.targetToday 
                                else 0f 
                            },
                            modifier = Modifier.fillMaxWidth().height(8.dp)
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(
                            "Streak: \${uiState.streakCount} days 🔥",
                            style = MaterialTheme.typography.bodyLarge
                        )
                    }
                }
                
                Spacer(modifier = Modifier.height(24.dp))
                Text(
                    "Scheduled Articles",
                    style = MaterialTheme.typography.titleLarge,
                    modifier = Modifier.align(Alignment.Start)
                )
                
                Spacer(modifier = Modifier.height(16.dp))
                // Future Implementation: Wait on actual articles via LazyColumn
                Text(
                    "Everything is caught up. Your Next batch arrives at 08:00 AM.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/presentation/onboarding/OnboardingScreen.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app.presentation.onboarding

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun OnboardingScreen(onFinished: () -> Unit) {
    Scaffold(
        topBar = { TopAppBar(title = { Text("Welcome to Daily Mentor") }) }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text("Select your target exam:", style = MaterialTheme.typography.titleMedium)
            
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf("UPSC", "SSC", "Custom").forEach { exam ->
                    FilterChip(
                        selected = exam == "UPSC", 
                        onClick = { },
                        label = { Text(exam) }
                    )
                }
            }

            Spacer(modifier = Modifier.weight(1f))

            Button(
                onClick = onFinished,
                modifier = Modifier.fillMaxWidth().height(50.dp)
            ) {
                Text("Start Learning")
            }
        }
    }
}`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/core/theme/Theme.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app.core.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme = darkColorScheme(
    primary = DeepEmerald,
    secondary = GreenGrey,
    tertiary = MintDark
)

private val LightColorScheme = lightColorScheme(
    primary = Emerald,
    secondary = GreenGreyLight,
    tertiary = MintLight
)

@Composable
fun DailyMentorTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}

// Custom brand Colors placeholders
val Emerald = androidx.compose.ui.graphics.Color(0xFF10B981)
val DeepEmerald = androidx.compose.ui.graphics.Color(0xFF059669)
val GreenGrey = androidx.compose.ui.graphics.Color(0xFF86EFAC)
val GreenGreyLight = androidx.compose.ui.graphics.Color(0xFFD1FAE5)
val MintLight = androidx.compose.ui.graphics.Color(0xFFA7F3D0)
val MintDark = androidx.compose.ui.graphics.Color(0xFF34D399)`
  },
  {
    name: "Notification_Implementation_Guide.md",
    type: "markdown",
    content: `# Notification Scheduling System

## Overview
Scheduling exact daily notifications on Android requires handling Doze mode, reboots, and exact alarm restrictions. While \`AlarmManager\` is traditional for exact times, the requirement uses **WorkManager**. 

Since \`PeriodicWorkRequest\` has flex intervals and doesn't guarantee an exact minute, we use a recursive **\`OneTimeWorkRequest\`** pattern:
1. Calculate the delay from \`now\` to the \`target time\`.
2. Schedule a one-time work request with that \`initialDelay\`.
3. When the worker runs, it shows the notification, then **reschedules itself for the next day**.

## Manifest Changes
You need to declare:
- \`POST_NOTIFICATIONS\` (for Android 13+)
- \`RECEIVE_BOOT_COMPLETED\` (handled by WorkManager internally)

## Permissions
The \`NotificationSettingsScreen\` includes logic to request the \`POST_NOTIFICATIONS\` runtime permission cleanly in Jetpack Compose using \`rememberLauncherForActivityResult\`.`
  },
  {
    name: "app/src/main/AndroidManifest.xml",
    type: "code",
    language: "xml",
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.dailymentor.app">

    <!-- Permissions required for Notifications and WorkManager -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

    <application
        android:name=".DailyMentorApp"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/Theme.DailyMentor">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.DailyMentor">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/scheduling/NotificationScheduler.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app.scheduling

import android.content.Context
import androidx.work.*
import java.util.Calendar
import java.util.concurrent.TimeUnit

object NotificationScheduler {
    const val WORK_NAME = "DAILY_ARTICLE_WORK"

    fun scheduleDailyNotification(context: Context, hour: Int, minute: Int) {
        val workManager = WorkManager.getInstance(context)

        val targetTime = Calendar.getInstance().apply {
            set(Calendar.HOUR_OF_DAY, hour)
            set(Calendar.MINUTE, minute)
            set(Calendar.SECOND, 0)
            
            // If the time has already passed today, schedule for tomorrow
            if (before(Calendar.getInstance())) {
                add(Calendar.DAY_OF_YEAR, 1)
            }
        }

        val initialDelay = targetTime.timeInMillis - System.currentTimeMillis()

        val workRequest = OneTimeWorkRequestBuilder<DailyArticleWorker>()
            .setInitialDelay(initialDelay, TimeUnit.MILLISECONDS)
            .addTag(WORK_NAME)
            .build()

        // Replace existing work to avoid duplicate notifications
        workManager.enqueueUniqueWork(
            WORK_NAME,
            ExistingWorkPolicy.REPLACE,
            workRequest
        )
    }
    
    fun cancelNotifications(context: Context) {
        WorkManager.getInstance(context).cancelUniqueWork(WORK_NAME)
    }
}`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/scheduling/DailyArticleWorker.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app.scheduling

import android.content.Context
import androidx.hilt.work.HiltWorker
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import dagger.assisted.Assisted
import dagger.assisted.AssistedInject
import java.util.Calendar

@HiltWorker
class DailyArticleWorker @AssistedInject constructor(
    @Assisted private val context: Context,
    @Assisted workerParams: WorkerParameters
) : CoroutineWorker(context, workerParams) {

    override suspend fun doWork(): Result {
        // 1. Show the notification
        NotificationHelper.showNotification(
            context = context,
            title = "Daily Article Mentor",
            message = "Today's article is ready. Keep up your streak!"
        )

        // 2. Schedule for the next day (recursive pattern)
        // Note: In a real app, you would fetch preferred time from user settings
        val calendar = Calendar.getInstance()
        val currentHour = calendar.get(Calendar.HOUR_OF_DAY)
        val currentMinute = calendar.get(Calendar.MINUTE)
        
        NotificationScheduler.scheduleDailyNotification(
            context = context,
            hour = currentHour,
            minute = currentMinute
        )

        return Result.success()
    }
}`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/scheduling/NotificationHelper.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app.scheduling

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import com.dailymentor.app.MainActivity

object NotificationHelper {
    private const val CHANNEL_ID = "daily_mentor_articles"
    private const val NOTIFICATION_ID = 1001

    fun showNotification(context: Context, title: String, message: String) {
        val notificationManager = 
            context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        // Create Channel for Android 8.0+
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Daily Articles",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Reminders to read your daily article"
            }
            notificationManager.createNotificationChannel(channel)
        }

        // Intent to open App Dashboard when tapped
        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            putExtra("navigate_to", "today_article")
        }

        val pendingIntent: PendingIntent = PendingIntent.getActivity(
            context,
            0,
            intent,
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )

        val notification = NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle(title)
            .setContentText(message)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .build()

        notificationManager.notify(NOTIFICATION_ID, notification)
    }
}`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/presentation/settings/SettingsViewModel.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app.presentation.settings

import android.content.Context
import androidx.lifecycle.ViewModel
import com.dailymentor.app.scheduling.NotificationScheduler
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject

@HiltViewModel
class SettingsViewModel @Inject constructor() : ViewModel() {

    private val _uiState = MutableStateFlow(SettingsUiState())
    val uiState: StateFlow<SettingsUiState> = _uiState.asStateFlow()

    fun updateNotificationTime(context: Context, hour: Int, minute: Int) {
        _uiState.value = _uiState.value.copy(
            selectedHour = hour,
            selectedMinute = minute,
            isNotificationEnabled = true
        )
        NotificationScheduler.scheduleDailyNotification(context, hour, minute)
    }
    
    fun toggleNotifications(context: Context, enabled: Boolean) {
        _uiState.value = _uiState.value.copy(isNotificationEnabled = enabled)
        if (enabled) {
            NotificationScheduler.scheduleDailyNotification(
                context, _uiState.value.selectedHour, _uiState.value.selectedMinute
            )
        } else {
            NotificationScheduler.cancelNotifications(context)
        }
    }
}

data class SettingsUiState(
    val isNotificationEnabled: Boolean = false,
    val selectedHour: Int = 8,
    val selectedMinute: Int = 0
)`
  },
  {
    name: "app/src/main/java/com/dailymentor/app/presentation/settings/NotificationSettingsScreen.kt",
    type: "code",
    language: "kotlin",
    content: `package com.dailymentor.app.presentation.settings

import android.Manifest
import android.app.TimePickerDialog
import android.os.Build
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NotificationSettingsScreen(viewModel: SettingsViewModel) {
    val uiState by viewModel.uiState.collectAsState()
    val context = LocalContext.current

    val permissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (isGranted) {
            viewModel.toggleNotifications(context, true)
        }
    }

    Scaffold(topBar = { TopAppBar(title = { Text("Settings") }) }) { padding ->
        Column(
            modifier = Modifier.fillMaxSize().padding(padding).padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text("Notification Preferences", style = MaterialTheme.typography.titleLarge)
            
            Card(modifier = Modifier.fillMaxWidth()) {
                Row(
                    modifier = Modifier.padding(16.dp).fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column {
                        Text("Daily Reminders", style = MaterialTheme.typography.titleMedium)
                        Text("Get notified when article is ready", style = MaterialTheme.typography.bodySmall)
                    }
                    Switch(
                        checked = uiState.isNotificationEnabled,
                        onCheckedChange = { enabled ->
                            if (enabled && Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                                permissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
                            } else {
                                viewModel.toggleNotifications(context, enabled)
                            }
                        }
                    )
                }
            }

            if (uiState.isNotificationEnabled) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    onClick = {
                        TimePickerDialog(
                            context,
                            { _, hourOfDay, minute -> 
                                viewModel.updateNotificationTime(context, hourOfDay, minute)
                            },
                            uiState.selectedHour,
                            uiState.selectedMinute,
                            false
                        ).show()
                    }
                ) {
                    Row(
                        modifier = Modifier.padding(16.dp).fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("Delivery Time", style = MaterialTheme.typography.titleMedium)
                        val timeFormatted = String.format(
                            Locale.getDefault(), 
                            "%02d:%02d %s",
                            if (uiState.selectedHour % 12 == 0) 12 else uiState.selectedHour % 12,
                            uiState.selectedMinute,
                            if (uiState.selectedHour >= 12) "PM" else "AM"
                        )
                        Text(timeFormatted, color = MaterialTheme.colorScheme.primary)
                    }
                }
            }
        }
    }
}`
  }
];