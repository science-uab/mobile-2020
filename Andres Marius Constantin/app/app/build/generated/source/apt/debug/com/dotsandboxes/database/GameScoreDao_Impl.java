package com.dotsandboxes.database;

import android.database.Cursor;
import androidx.room.EntityInsertionAdapter;
import androidx.room.RoomDatabase;
import androidx.room.RoomSQLiteQuery;
import androidx.room.util.CursorUtil;
import androidx.room.util.DBUtil;
import androidx.sqlite.db.SupportSQLiteStatement;
import java.lang.Long;
import java.lang.Override;
import java.lang.String;
import java.lang.SuppressWarnings;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unchecked")
public final class GameScoreDao_Impl implements GameScoreDao {
  private final RoomDatabase __db;

  private final EntityInsertionAdapter __insertionAdapterOfGameScore;

  public GameScoreDao_Impl(RoomDatabase __db) {
    this.__db = __db;
    this.__insertionAdapterOfGameScore = new EntityInsertionAdapter<GameScore>(__db) {
      @Override
      public String createQuery() {
        return "INSERT OR ABORT INTO `GameScore`(`id`,`opponent`,`mode`,`date`,`score`,`result`) VALUES (nullif(?, 0),?,?,?,?,?)";
      }

      @Override
      public void bind(SupportSQLiteStatement stmt, GameScore value) {
        stmt.bindLong(1, value.getId());
        if (value.getOpponent() == null) {
          stmt.bindNull(2);
        } else {
          stmt.bindString(2, value.getOpponent());
        }
        if (value.getMode() == null) {
          stmt.bindNull(3);
        } else {
          stmt.bindString(3, value.getMode());
        }
        if (value.getDate() == null) {
          stmt.bindNull(4);
        } else {
          stmt.bindLong(4, value.getDate());
        }
        if (value.getScore() == null) {
          stmt.bindNull(5);
        } else {
          stmt.bindString(5, value.getScore());
        }
        if (value.getResult() == null) {
          stmt.bindNull(6);
        } else {
          stmt.bindString(6, value.getResult());
        }
      }
    };
  }

  @Override
  public void insertGameScore(final GameScore gameScore) {
    __db.beginTransaction();
    try {
      __insertionAdapterOfGameScore.insert(gameScore);
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
    }
  }

  @Override
  public List<GameScore> getAll() {
    final String _sql = "SELECT * FROM gamescore ORDER BY date desc";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
    final Cursor _cursor = DBUtil.query(__db, _statement, false);
    try {
      final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "id");
      final int _cursorIndexOfOpponent = CursorUtil.getColumnIndexOrThrow(_cursor, "opponent");
      final int _cursorIndexOfMode = CursorUtil.getColumnIndexOrThrow(_cursor, "mode");
      final int _cursorIndexOfDate = CursorUtil.getColumnIndexOrThrow(_cursor, "date");
      final int _cursorIndexOfScore = CursorUtil.getColumnIndexOrThrow(_cursor, "score");
      final int _cursorIndexOfResult = CursorUtil.getColumnIndexOrThrow(_cursor, "result");
      final List<GameScore> _result = new ArrayList<GameScore>(_cursor.getCount());
      while(_cursor.moveToNext()) {
        final GameScore _item;
        _item = new GameScore();
        final long _tmpId;
        _tmpId = _cursor.getLong(_cursorIndexOfId);
        _item.setId(_tmpId);
        final String _tmpOpponent;
        _tmpOpponent = _cursor.getString(_cursorIndexOfOpponent);
        _item.setOpponent(_tmpOpponent);
        final String _tmpMode;
        _tmpMode = _cursor.getString(_cursorIndexOfMode);
        _item.setMode(_tmpMode);
        final Long _tmpDate;
        if (_cursor.isNull(_cursorIndexOfDate)) {
          _tmpDate = null;
        } else {
          _tmpDate = _cursor.getLong(_cursorIndexOfDate);
        }
        _item.setDate(_tmpDate);
        final String _tmpScore;
        _tmpScore = _cursor.getString(_cursorIndexOfScore);
        _item.setScore(_tmpScore);
        final String _tmpResult;
        _tmpResult = _cursor.getString(_cursorIndexOfResult);
        _item.setResult(_tmpResult);
        _result.add(_item);
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  @Override
  public long getTotalGamesPlayed() {
    final String _sql = "SELECT count(*) FROM gamescore";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
    final Cursor _cursor = DBUtil.query(__db, _statement, false);
    try {
      final long _result;
      if(_cursor.moveToFirst()) {
        _result = _cursor.getLong(0);
      } else {
        _result = 0;
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  @Override
  public long getWinMatches() {
    final String _sql = "SELECT COUNT(*) FROM gamescore WHERE result is 'Won'";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
    final Cursor _cursor = DBUtil.query(__db, _statement, false);
    try {
      final long _result;
      if(_cursor.moveToFirst()) {
        _result = _cursor.getLong(0);
      } else {
        _result = 0;
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  @Override
  public long getTieMatches() {
    final String _sql = "SELECT COUNT(*) FROM gamescore WHERE result is 'Tie'";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
    final Cursor _cursor = DBUtil.query(__db, _statement, false);
    try {
      final long _result;
      if(_cursor.moveToFirst()) {
        _result = _cursor.getLong(0);
      } else {
        _result = 0;
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  @Override
  public long getLostMatches() {
    final String _sql = "SELECT COUNT(*) FROM gamescore WHERE result is 'Lost'";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
    final Cursor _cursor = DBUtil.query(__db, _statement, false);
    try {
      final long _result;
      if(_cursor.moveToFirst()) {
        _result = _cursor.getLong(0);
      } else {
        _result = 0;
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }
}
