package com.dotsandboxes.database;

import androidx.room.DatabaseConfiguration;
import androidx.room.InvalidationTracker;
import androidx.room.RoomOpenHelper;
import androidx.room.RoomOpenHelper.Delegate;
import androidx.room.util.DBUtil;
import androidx.room.util.TableInfo;
import androidx.room.util.TableInfo.Column;
import androidx.room.util.TableInfo.ForeignKey;
import androidx.room.util.TableInfo.Index;
import androidx.sqlite.db.SupportSQLiteDatabase;
import androidx.sqlite.db.SupportSQLiteOpenHelper;
import androidx.sqlite.db.SupportSQLiteOpenHelper.Callback;
import androidx.sqlite.db.SupportSQLiteOpenHelper.Configuration;
import java.lang.IllegalStateException;
import java.lang.Override;
import java.lang.String;
import java.lang.SuppressWarnings;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@SuppressWarnings("unchecked")
public final class GameScoreDatabase_Impl extends GameScoreDatabase {
  private volatile GameScoreDao _gameScoreDao;

  @Override
  protected SupportSQLiteOpenHelper createOpenHelper(DatabaseConfiguration configuration) {
    final SupportSQLiteOpenHelper.Callback _openCallback = new RoomOpenHelper(configuration, new RoomOpenHelper.Delegate(1) {
      @Override
      public void createAllTables(SupportSQLiteDatabase _db) {
        _db.execSQL("CREATE TABLE IF NOT EXISTS `GameScore` (`id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, `opponent` TEXT, `mode` TEXT, `date` INTEGER, `score` TEXT, `result` TEXT)");
        _db.execSQL("CREATE TABLE IF NOT EXISTS room_master_table (id INTEGER PRIMARY KEY,identity_hash TEXT)");
        _db.execSQL("INSERT OR REPLACE INTO room_master_table (id,identity_hash) VALUES(42, \"f101173a045cda43931fb9de3b2d2597\")");
      }

      @Override
      public void dropAllTables(SupportSQLiteDatabase _db) {
        _db.execSQL("DROP TABLE IF EXISTS `GameScore`");
      }

      @Override
      protected void onCreate(SupportSQLiteDatabase _db) {
        if (mCallbacks != null) {
          for (int _i = 0, _size = mCallbacks.size(); _i < _size; _i++) {
            mCallbacks.get(_i).onCreate(_db);
          }
        }
      }

      @Override
      public void onOpen(SupportSQLiteDatabase _db) {
        mDatabase = _db;
        internalInitInvalidationTracker(_db);
        if (mCallbacks != null) {
          for (int _i = 0, _size = mCallbacks.size(); _i < _size; _i++) {
            mCallbacks.get(_i).onOpen(_db);
          }
        }
      }

      @Override
      public void onPreMigrate(SupportSQLiteDatabase _db) {
        DBUtil.dropFtsSyncTriggers(_db);
      }

      @Override
      public void onPostMigrate(SupportSQLiteDatabase _db) {
      }

      @Override
      protected void validateMigration(SupportSQLiteDatabase _db) {
        final HashMap<String, TableInfo.Column> _columnsGameScore = new HashMap<String, TableInfo.Column>(6);
        _columnsGameScore.put("id", new TableInfo.Column("id", "INTEGER", true, 1));
        _columnsGameScore.put("opponent", new TableInfo.Column("opponent", "TEXT", false, 0));
        _columnsGameScore.put("mode", new TableInfo.Column("mode", "TEXT", false, 0));
        _columnsGameScore.put("date", new TableInfo.Column("date", "INTEGER", false, 0));
        _columnsGameScore.put("score", new TableInfo.Column("score", "TEXT", false, 0));
        _columnsGameScore.put("result", new TableInfo.Column("result", "TEXT", false, 0));
        final HashSet<TableInfo.ForeignKey> _foreignKeysGameScore = new HashSet<TableInfo.ForeignKey>(0);
        final HashSet<TableInfo.Index> _indicesGameScore = new HashSet<TableInfo.Index>(0);
        final TableInfo _infoGameScore = new TableInfo("GameScore", _columnsGameScore, _foreignKeysGameScore, _indicesGameScore);
        final TableInfo _existingGameScore = TableInfo.read(_db, "GameScore");
        if (! _infoGameScore.equals(_existingGameScore)) {
          throw new IllegalStateException("Migration didn't properly handle GameScore(com.dotsandboxes.database.GameScore).\n"
                  + " Expected:\n" + _infoGameScore + "\n"
                  + " Found:\n" + _existingGameScore);
        }
      }
    }, "f101173a045cda43931fb9de3b2d2597", "e4657297c3739f0459e89f5dabbd5e50");
    final SupportSQLiteOpenHelper.Configuration _sqliteConfig = SupportSQLiteOpenHelper.Configuration.builder(configuration.context)
        .name(configuration.name)
        .callback(_openCallback)
        .build();
    final SupportSQLiteOpenHelper _helper = configuration.sqliteOpenHelperFactory.create(_sqliteConfig);
    return _helper;
  }

  @Override
  protected InvalidationTracker createInvalidationTracker() {
    final HashMap<String, String> _shadowTablesMap = new HashMap<String, String>(0);
    HashMap<String, Set<String>> _viewTables = new HashMap<String, Set<String>>(0);
    return new InvalidationTracker(this, _shadowTablesMap, _viewTables, "GameScore");
  }

  @Override
  public void clearAllTables() {
    super.assertNotMainThread();
    final SupportSQLiteDatabase _db = super.getOpenHelper().getWritableDatabase();
    try {
      super.beginTransaction();
      _db.execSQL("DELETE FROM `GameScore`");
      super.setTransactionSuccessful();
    } finally {
      super.endTransaction();
      _db.query("PRAGMA wal_checkpoint(FULL)").close();
      if (!_db.inTransaction()) {
        _db.execSQL("VACUUM");
      }
    }
  }

  @Override
  public GameScoreDao gameScoreDao() {
    if (_gameScoreDao != null) {
      return _gameScoreDao;
    } else {
      synchronized(this) {
        if(_gameScoreDao == null) {
          _gameScoreDao = new GameScoreDao_Impl(this);
        }
        return _gameScoreDao;
      }
    }
  }
}
